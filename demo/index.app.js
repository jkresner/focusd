import marked  from 'marked'
import focusd from '../lib/focusd'
import din from '../test/fixt/in'
import dup from '../test/fixt/up'
import transforms from '../demo/transforms'
import '../styles/demo/layout.less'
document.body.id = 'demo'


var ops = {
  markupFormat: 'json', // 'compact',
  transforms: transforms,
  transform: { type: {
    case: { rendered: ['li_counter_set'] },
    law: { pre: ['law_lists'] } } },
  types: ['doc','mail','law','case','img']
}


function child(tag, inner, css, id, parent) {
  var t = document.createElement(tag)
  if (inner) {
    if (t.hasOwnProperty('value')) t.value = inner
    else t.innerHTML = inner
  }
  if (id) t.id = id
  if (css) t.classList = css
  if (parent) parent.appendChild(t)
  else document.body.appendChild(t)
  return t
}

child('h1', 'focusd demo')
child('ol', `<li class="px48"><p>480px</p></li>
             <li class="px64"><p>640px</p></li>
             <li class="px80"><p>800px</p></li>
             <li class="px12"><p>1200px</p></li>
             <li class="px32"><p>320px</p></li>`)
child('div' , '', 'focusd', 'prv', child('aside'))

var ul = child('ul')

function ta(id, value, css) {
  var li = child('li', null, css, null, ul)
  var radios = child('fieldset', '', null, null, li)
  var name = 't'+id

  var types = []
  if (/^in/.test(id)) types = ops.types
  if (/^up$/.test(id)) types = ['compact','json']
  types.forEach(function(typ) {
    var rid = name+typ
    var chk = typ==css?'checked="checked" ':''
    radios.innerHTML +=
      '<input name="'+name+'" type="radio" id="'+rid+
         '" onchange="rfsh()" '+chk+'/> '
      +'<label for="'+rid+'">'+typ+'</label>'
  })

  child('label', id, null, null, li).setAttribute('for', id)
  return child('textarea', value, null, id, li)
}

var uptxt = [
  ta('upi', ''),
  ta('up', dup.js['sma-fin-mgt'].trim(), 'json'),
  ta('upf', '')
]

var intxt = [
  ta('in0', din.doc['cash-mth'], 'doc'),
  ta('in1', din.law['ssma-p5'], 'law'),
  ta('in2', din.case['cl-meta'], 'case')
]

var el = {}
uptxt.concat(intxt).forEach(function (elm) {
  el[elm.id] = elm
})

//pre: ta('pre', ''),
//pst: ta('pst', ''),
//rdr: ta('rnr', '')
//}
// child('li',null,null,null,ul);


function rfsh() {
  var prv = document.getElementById('prv')
  prv.innerHTML = 'rendering'

  if (document.getElementById('tupcompact').checked)
    opts.markupFormat = 'compact'

  var mup_json = focusd.parse(el.up.value, ops)
  el.upf.value = JSON.stringify(mup_json.focus, null, ' ')
  el.upi.value = JSON.stringify(mup_json.in, null, ' ')

  var ins = []
  for (var i=0;i<intxt.length;i++) {
    ins.push(el['in'+i].value)
    mup_json.in[i] = mup_json.in[i] || {}
    ops.types.forEach(function(itype) {
      if (document.getElementById('tin'+i+itype).checked)
        mup_json.in[i].type = itype
    })
  }
  var output = focusd(ins, mup_json, ops, function(e, r) {
    if (e) prv.innerHTML += '<p class="error">'+e.toString()+'</p>'
    else prv.innerHTML += '<p class="ok">'+r.toString()+'</p>'
  })

  prv.innerHTML = output

  for (var elm in el) {
   el[elm].style.height = '100px'
   el[elm].style.height = (el[elm].scrollHeight-10)+"px"
  }
}


document.addEventListener("DOMContentLoaded", function(event) {
  rfsh()
})




if (module.hot)
  module.hot.accept('../lib/focusd', function() {
    console.log('\n--- HOT: ../lib/focusd')
    rfsh()
  })


// console.log('\n--- END: index.js', )
