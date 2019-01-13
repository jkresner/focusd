;(function(root) {
'use strict';

/*
 */
function Color(options) {
  this.defaults = {
    white:   { ansi: '1;37', rgb: '255,255,255', gs: '255', hex: 'ffffff', hsl: '0,0%,100%'   }, // cmyk: "0,0,0,0" },
    yellow:  { ansi: '1;33', rgb: '255,255,0'  , gs: '230', hex: 'ffff00', hsl: '60,100%,85%' }, // cmyk: "0,0,0,0" },
    green:   { ansi: '1;32', rgb: '0,255,0'    , gs: '200', hex: '99ff99', hsl: '120,100%,95%'}, // cmyk: "0,0,0,0" },
    cyan:    { ansi: '1;36', rgb: '0,255,255'  , gs: '170', hex: '4dffff', hsl: '180,100%,90%'}, // cmyk: "0,0,0,0" },
    gray:    { ansi: '0;30', rgb: '128,128,128', gs: '128', hex: '808080', hsl: '0,0%,50%'    }, // cmyk: "0,0,0,0" },
    blue:    { ansi: '0;34', rgb: '0,0,255'    , gs: '100', hex: '80aaff', hsl: '215,100%,85%'}, // cmyk: "0,0,0,0" },
    magenta: { ansi: '0;35', rgb: '255,0,255'  , gs: '75' , hex: 'ff80ff', hsl: '300,100%,50%'}, // cmyk: "0,0,0,0" },
    red:     { ansi: '0;31', rgb: '255,0,0'    , gs: '45' , hex: 'ff3333', hsl: '0,85%,50%'   }, // cmyk: "0,0,0,0" },
    brown:   { ansi: '0;31', rgb: '128,128,0'  , gs: '25' , hex: '996633', hsl: '30,50%,85%'  }, // cmyk: "0,0,0,0" },
    black:   { ansi: '0'   , rgb: '0,0,0'      , gs: '0'  , hex: '000000', hsl: '0,0%,0%'     }  // cmyk: "0,0,0,0" }
  }
}

var tsc = require('./transcribe')
function Transcribe(markup, ops) {
  var up;

  if (/json/.test(ops.markupFormat))
    up = JSON.parse(JSON.parse(JSON.stringify(markup)))
  else if (/compact|short/.test(ops.markupFormat))
    up = tsc.json(tsc.expand(markup.toString()))

  up.focus = up.focus || []
  return up
}

var tns = require('./transform')
function Transform(src, fup, idx, opts, cb) {
  tns.setOpts({idx:idx,stage:'pre'}, opts)
  var prm = { focus: fup.focus, idx:idx }
  var base = opts.transform
  var input = fup.in[idx]
  var typed = base.type[input.type]||{}
  input.pre = input.pre || []
  if (input.ellipt_ln) input.pre.push('ellipt_ln')
  if (input.rm_decimal) input.pre.push('rm_decimal')
  var pre = (input.pre).concat(base.pre||[]).concat(typed.pre||[])
  var post = (input.post||[]).concat(base.post||[]).concat(typed.post||[])
  var rendered = (input.rendered||[]).concat(base.rendered||[]).concat(typed.rendered||[])
  LOG('in'+idx, input.type, 'pre:', pre.join(' '), 'post:', post.join(' '), 'rendered:', rendered.join(' '))

  var transformd = []
  var r = src.toString()

  var tDone = function(e, r) {
    if (e) return cb(e)
    transformd.push(r)
    var tname = Object.keys(r)[0]
    cb(null, 'in'+idx+tname, r[tname])
  }

  function tMap(f) {
    if (typeof tns[f] === 'undefined')
      throw new Error('focusd: transform['+f+'] is null. Define at ops.transforms.'+f)
    return function(src, o) {
      return tns[f].apply(this, [src, input[f], tDone])
    }
  }

  // Before we mark selections
  pre.forEach(function(n) { r = tMap(n)(r) })
  cb(null, 'in'+idx+'_pre', r)

  // add <mark></marks>
  r = tns.mark(r, prm, tDone)

  // After we added mark selections
  tns.setOpts({stage:'post'},{})
  post.forEach(function(n) { r = tMap(n)(r) })
  cb(null, 'in'+idx+'_post', r)

  tns.setOpts({stage:'rendered'},{})
  cb(null, 'in'+idx+'_rendered', r)

  r = tns.md_toHtml(r, prm, tDone)
  rendered.forEach(function(n) { r = tMap(n)(r) })

  return r
}

var marked = root.marked || require('marked')
/**
 *
 */
function focusd(inputs, mup, ops, cb) {
  if (typeof inputs === 'undefined' || inputs === null)
    throw new Error('focusd(): inputs parameter is undefined or null')
  if (!Array.isArray(inputs))
    inputs = [inputs]

  for (var i=0; i<inputs.length; i++) {
    var raw = inputs[i].raw || inputs[i]
    if (typeof raw !== 'string')
      throw new Error('focusd():inputs['+i+'] expects string, got '
        + Object.prototype.toString.call(raw))
  }

  if (cb || typeof ops === 'function') {
    if (!cb) {
      cb = ops
      ops = null
    }
  }
  if (!cb) cb = function(e, r) {
    if (e) console.log('cb.e', e, 'ops', ops)
    else if (r) console.log('cb.r', r)
  }

  ops = setOpts(ops || {})
  tns._extend(ops.transforms).setOpts({idx:'a',stage:'ann'}, ops, marked)
  

  // console.log('ops.', 'hPrefix:', ops.headerPrefix, 'trns:', ops.transform)
  // console.log('inputs', inputs.length, inputs[0])
  var figs = ''
  for (i=0; i < inputs.length; i++)
    figs += ('<figure class="in'+i+' '+mup.in[i].type+'">'
           + focusd.transform(inputs[i], mup, i, ops, cb)+'</figure>');

  // LOG('figs', inputs.length, figs)
  var notes = mup.focus.length > 0 ? tns.annotations('', mup, cb) : ''
  // LOG('notes', notes)
  return notes + figs
}

/**
 *
 */
function setOpts(opts) {
  var dflts = focusd.defaults
  var dtfm = dflts.transform
  var tfm = opts.transform || {}
  tfm.pre = tfm.pre || []
  dtfm.pre.forEach(function(t) { if (tfm.pre.indexOf(t)<0) tfm.pre.push(t) })
  tfm.post = tfm.post || []
  dtfm.post.forEach(function(t) { if (tfm.post.indexOf(t)<0) tfm.post.push(t) })
  tfm.rendered = tfm.rendered || []
  dtfm.rendered.forEach(function(t) { if (tfm.rendered.indexOf(t)<0) tfm.rendered.push(t) })
  // console.log('dtfm.type', dtfm.type)
  tfm.type = Object.assign({}, dtfm.type, tfm.type || {})
  // console.log('tfm.type', tfm.type)
  opts.transform = tfm
  // LOG('opts.transform', opts.transform)
  return Object.assign({}, dflts, opts)
};

focusd.options = focusd.setOptions = setOpts

focusd.getDefaults = function () {
  return {
    baseUrl: null,
    breaks: true,
    colors: new Color().defaults,
    gfm: true,
    headerIds: true,
    headerPrefix: 'foc',
    // highlight: true,
    inputFormat: 'md',
    langPrefix: 'focusd',
    markupFormat: 'compact', // 'shorthand', 'verbose', 'json', 'html'
    renderFormat: 'Html', // 'Pdf', 'Stdout'
    sanitize: false,
    silent: false,
    transforms: {},
    transform: {
      pre:      ['ins_part'],
      post:     [],
      rendered: [],
      type: {
        doc: { pre: [], post: [], rendered: [] },
        img: { pre: [], post: [], rendered: [] },
        mail: { pre: [], post: [], rendered: [] },
        web: { pre: [], post: [], rendered: [] }        
      }
    },
    types:     ['doc','mail','img','web']
  }
}

focusd.defaults = focusd.getDefaults()

/**
 * Expose
 */
focusd.Color = Color;
focusd.transform = Transform;
focusd.parse = Transcribe;

if (typeof module !== 'undefined' && typeof exports === 'object') {
  module.exports = focusd;
} else if (typeof define === 'function' && define.amd) {
  define(function() { return focusd; });
} else {
  root.focusd = focusd;
}
})(this || (typeof window !== 'undefined' ? window : global));
