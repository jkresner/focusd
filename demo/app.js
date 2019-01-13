window.LOG = function () { if (true)
  console.log.apply(this, arguments) }

import '../styles/demo/layout.less'
import html from './html'
import focusd from '../lib/focusd'
import transforms from './tforms'
import d from './data'
import moment from 'moment-timezone'

window.moment = moment
var fmt = ['json','short','compact']
var types = ['doc','mail','law','case','img','web']
var ops = {
  markupFormat:  'short',
  transform: {
    type: {
      mail: {    pre: ['mail_header'] },
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

  doc.checkd('tupshort', function() { ops.markupFormat = 'tupshort' })

  var mup      = focusd.parse(el.up.value, ops)
  el.upf.value = JSON.stringify(mup.focus, null, ' ')
  el.upi.value = JSON.stringify(mup.in, null, ' ')

  var v = -1
  var values = ins.map(function(ta) {
    v++
    mup.in[v] = mup.in[v] || {}
    types.forEach(function(typ) {
      doc.checkd('tin'+v+typ, function() { mup.in[v].type = typ })
    })
    return ta.value
  })

  var output = focusd(values, mup, ops, function(e, key, val) {
    if (e) doc.prv('<p class="error">'+e.toString()+'</p>')
    else {
      if (el[key]!= null) el[key].value = val
      doc.prv('<p class="ok">'+key+'</p>')
      // LOG(key, '.val=', val.split('\n')[0])
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
var ups = [
  t('upi', ''),
  t('up', d.up, 'json', fmt),
  t('upf', '')
]
var ins = d.in.map(function (src, i) {
  // console.log('in'+i, src.id, src.id.split('_')[0], types)
  return t('in'+i, src.md, src.id.split('_')[0], types)
})
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
