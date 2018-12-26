import '../styles/demo/layout.less'
import html from '../demo/html'
import din from '../test/fixt/in'
import dup from '../test/fixt/up.md'

import marked  from 'marked'
import focusd from '../lib/focusd'
import transforms from '../demo/transforms'


var upForm = ['json','compact']
var inType = ['doc','mail','law','case','img']
var ops = {
  markupFormat:  upForm[0],
  transforms:    transforms,
  transform: {
    type: {
      case: {    rendered: ['li_counter_set'] },
      law: {     pre: ['law_lists'] }
    }
  },
  types:         inType
}


function r() {
  doc.prv('rendering', true)

  doc.checkd('tupcompact', function(){ ops.markupFormat = 'compact' })

  var mup      = focusd.parse(el.up.value, ops)
  el.upf.value = JSON.stringify(mup.focus, null, ' ')
  el.upi.value = JSON.stringify(mup.in, null, ' ')

  var ins = []
  for (var i=0;i<ins.length;i++) {
    mup.in[i] = mup.in[i] || {}
    ins.push(el['in'+i].value)
    inTypes.forEach(function(t) {
      doc.checkd('tin'+i+t, function() { mup.in[i].type = t })
    })
  }
  var output = focusd(ins, mup, ops, function(e, r) {
    if (e) doc.prv('<p class="error">'+e.toString()+'</p>')
    else doc.prv('<p class="ok">'+r.toString()+'</p>')
  })

  doc.prv(output, true)
  el.out.value = output

  for (var id in el) doc.ta_scroll(id)
}


var doc = html('demo', 'focusd demo', {ruler:1,onload:r})
var t = doc.ta
var ups = [
  t('upi', ''),
  t('up', dup.js['sma-fin-mgt'].trim(), 'json', upForm),
  t('upf', '')
]
var ins = [
  t('in0', din.doc['cash-mth'], 'doc', inType),
  t('in1', din.law['ssma-p5'], 'law', inType),
  t('in2', din.case['cl-meta'], 'case', inType)
]
var prc = [
//pre: ta('pre', ''),
//pst: ta('pst', ''),
  t('out', '')
//child('li',null,null,null,ul);
]
var el = doc.el(ups, ins, prc)


if (module.hot)
  module.hot.accept('../lib/focusd', function() {
    console.log('\n--- HOT: ../lib/focusd')
    rfsh()
  })
