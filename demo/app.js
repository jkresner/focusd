import '../styles/demo/layout.less'
import html from './html'
import focusd from '../lib/focusd'
import transforms from './transforms'
import d from './data'

var fmt = ['json','short','compact']
var types = ['doc','mail','law','case','img']
var ops = {
  markupFormat:  'json',
  transform: {
    type: {
      case: {    pre: ['lref','cref'], rendered: ['ol_start'] },
      law: {     pre: ['law_li','lref'] }
    }
  },
  transforms:    transforms,
  types:         types
}

/*
 */
function r() {
  doc.prv('', true)

  doc.checkd('tupcompact', function() { ops.markupFormat = 'compact' })

  var mup      = focusd.parse(el.up.value, ops)
  el.upf.value = JSON.stringify(mup.focus, null, ' ')
  el.upi.value = JSON.stringify(mup.in, null, ' ')

  var srcs = []
  for (var i=0; i<ins.length; i++) {
    mup.in[i] = mup.in[i] || {}
    srcs.push(el['in'+i].value)
    types.forEach(function(t) {
      doc.checkd('tin'+i+t, function() { mup.in[i].type = t })
    })
  }
  var output = focusd(srcs, mup, ops, function(e, key, val) {
    if (e) doc.prv('<p class="error">'+e.toString()+'</p>')
    else {
      if (el[key]!= null) el[key].value = val
      doc.prv('<p class="ok">'+key+'</p>')
      console.log(key, '.val=', val.split('\n')[0])
    }
  })

  doc.prv(output, true)
  el.rendered.value = output
  cd.innerText = output.replace('</div>','\n</div>')

  for (var id in el)
    doc.taScroll(id)
}

var doc = html('demo', 'focusd demo', {ruler:1,onload:r})
var cd = doc.child('code', '\nr\ne\nn\nd\ne\nr\ni\nn\ng', 'html language-html', 'out', doc.child('pre'))
var t = doc.ta
var ins = []
for (var n in d._in) {
  console.log('in'+ins.length, n, n.split('_')[0])
  ins.push(t('in'+ins.length, d._in[n], n.split('_')[0], types))
}
var ups = [
  t('upi', ''),
  t('up', d._up, 'json', fmt),
  t('upf', '')
]
var prc = [
  t('in0_pre', ''),
  t('in0_post', ''),
  t('in0_rendered', ''),
  t('rendered', '')
]
var el = doc.el(ups, ins, prc)

if (module.hot)
  module.hot.accept('../lib/focusd', function() {
    r(console.log('[HOT] ../lib/focusd'))
  })
