var Transform = {}

var rx = { escr: /[-\/\\^$*+?.()|[\]{}]/g, md: {} }
rx.md.partial = { start: /\-\-\-\n### /g, ins: /\[#[A-Z]\]/g }
rx.esc = function(s) {
  return s ? new RegExp(s.replace(rx.escr, '\\$&'),'g') : null
}

Transform.ellipt_ln = function(src, lns, ops) {
  var removed = 0
  var r = src.toString().split('\n')
  for (var l=0; l<lns.length; l++) {
    var elt = lns[l]
    var start = 0, end = 0
    if (/^\d\-\d$/.test(elt)) {
      var idx = elt.split('-')
      start = parseInt(idx[0])
      end = parseInt(idx[1])
    } else if (/^\d$/.test(elt)) {
      start = parseInt(elt)
      end = parseInt(start+1)
    }
    if (end > start) {
      removed += end-start
      r = r.slice(0, start-removed) + ' ... '
        + r.slice(end-removed, r.lengh)
    }
  }
  return r.join('\n')
}
Transform['…'] = Transform.ellipt_ln

/*
 */
Transform.mp_ellipt = function(r, map, ops) {
  var keys = Object.keys(map)
  for (var k=0; k<keys.length; k++) {
    var start = r.indexOf(keys[k])
    var end =  r.indexOf(map[keys[k]])
    if (start > -1 && end > -1 && end > start)
      r = r.slice(0, start) + ' ... ' + r.slice(end, r.lengh)
  }
  return r
}
Transform[';'] = Transform.ellipt_map

/*
 */
Transform.mp_crypt = function(r, maps, ops) {
  if (!maps.length) maps = [maps]
  maps.forEach(function(m) {
    // console.log('mapcrypt.map'.dim, m)
    for (var to in m)
      r = r.replace(m[to], to)
  })
  return r
}
Transform[':'] = Transform.mp_crypt

/*
 */
Transform.mp_abbr = function(r, map, ops) {
  for (var abbr in map)
    r = r.replace(map[abbr], '<abbr>'+abbr+'</abbr>')
  return r
}
Transform['>'] = Transform.mapcrypt

// rx.moment = function(s) { return new RegExp(s
//     .replace('MM','([0][1-9]|[1][0-2])')
//     .replace('YYYY','[1-2][0-9][0-9][0-9]')
//     .replace('DD','([0][1-9]|[1-2][0-9]|[3][0-1])'))
// }
// Transform.fm_date = function(src, param, ops, cb) {
//   var r = input.toString(),
//    from = param[0],
//      to = param[1],
//      tz = param[2],
//      fn = ops.transform.datetime ||
//           function(m) { return moment(m).format('D-MMM`YY') }
//   var match = ops.match || rx.moment(ops.from)
//   return r
// }

Transform.rm_decimal = function(r, params, ops) {
  return r.replace(/(\.\d+)+/g,'')
}
Transform['Ð'] = Transform.rm_decimals

/*
 */
function hi(tag, inner, obj) {
  var elCss = ' class="hi' + obj.color||0 + '"',
      elId = obj.id ? ' id="'+obj.id+'"' : ''
  var elm = '<'+tag+elCss+elId+' >'+inner||''+'</'+tag+'>'
  return elm
}

/*
 */
Transform.mark = function(r, p, ops) {
  var focus = p.focus
  var m=0
  focus.forEach(function(f) {
    var mki = '<i>'+m+'</i> ';
    (f.mark||[]).forEach(function(select) {
      // console.log('f.mark['+m+']', select)
      var match = rx.esc(typeof select !== 'string' ? select[ops.idx] : select)
      r = r.replace(match, hi('mark', mki+select, f))
    })
    m++
  })
  return r
}

/*
 */
Transform.annotations = function(r, p, ops) {
  if (((p||{}).focus||[]).length < 1) return r

  var fc = p.focus
  var li = ''

  for (var i=0; i<fc.length; i++)
    li += hi('li', toHtml(fc[i].note||''), fc[i])

  return (r||'') +'<article id="'+ops.scope||''+'"><ol>'+li+'</ol></article>'
}

/*

[#<id>]

---
### <id>

*/
Transform.ins_part = function(src, p, ops) {
  var parts = src.split(rx.md.partial.start)
  var r = parts[0]
  for (var i=1; i<parts.length; i++) {
    var lines = parts[i].split('\n')
    var pid = lines.shift().trim()
    var at = new RegExp('\\[#'+pid+'\\]','g')
    var html = toHtml(lines
      .join('\n'))
      .replace(/\\n/g,'<br />')
      .replace(/\n/g,'')
    r = r.replace(at, html)
  }       // .trim()
  return r
}
Transform['%'] = Transform.ins_parts

/*
Transform.md_toStdout = function(input, params, ops) {
  throw Error("Not yet implemented")
} */

Transform.md_toHtml = function(input, p, ops) {
  var r = toHtml(input)
    .replace(/ {2}\\n\\n/g, '<br /><br />')
    .replace(/ {2}\\n/g, '<br />')
    .replace(/\>\\n/g, '><br />')
    .replace(/\>\\n\\n/g, '><br />')
    // if ((ops.postproc||{}).dev) r = r
    .replace(/\n\<\//g, '</')
    .replace(/\n\<tr\>/g, '\n  <tr>')
    .replace(/\n\<tbody\>\<tr\>/g, '<tbody>\n  <tr>')
    .replace(/<th>/g, '    <th>')
    .replace(/<th a/g, '    <th a')
    .replace(/<td>/g, '    <td>')
    .replace(/\<table\>\n\<thead\>/g, '\n<table><thead>')
  return r
//          .trim()
}

/*
Transform.arrange = function(input, params, ops) {
  var parts = input
}
*/
var toHtml;
var _options = {}

function wrap(n, fn) {
  transform[n] = function() {
    var r={}
    var args = Object.values(arguments)
    var cb = args.pop()
    var src = args.shift()
    var o = _options
    var prm = args[0]
    var ns = o.scope+'_in'+o.idx+'['+o.stage+':'+n+']'
    if (!o && !o.scope) console.log(ns, n+'(op == null)')
    // if (typeof src === 'string') console.log(src.split('\n')[1], prms)
    // else console.log(src, prms)
    try {
      if (typeof prm === 'string') prm = prm.split(',')
      r[n] = fn.apply(this, [src.toString(), prm, o, cb])
    } catch (e) {
      console.log('ERR fcd.transform.'+n, e)
      console.log(o)
      console.log('tns.prm', prm)
      console.log('tns.src', src)
      if (!o.silent) throw e
    }
    cb(null,r)
    return r[n]
  }
}

var transform = {
  setOpts: function(tOps, fOps, marked) {
    var scope = (fOps||{}).headerPrefix ? fOps.headerPrefix+'-' : null
    if (marked) toHtml = marked.setOptions({
      breaks:       fOps.breaks,
      gfm:          fOps.gfm,
      headerIds:    fOps.headerIds,
      headerPrefix: scope
    })
    _options.idx = tOps.hasOwnProperty('idx') ? tOps.idx : _options.idx
    _options.scope = scope || _options.scope
    _options.silent = fOps.silent || false
    _options.stage = tOps.stage || _options.stage
    // _options.render = Transform[fOps.inputFormat+'_to'+fOps.renderFormat] || _options.render
    return transform
  },
  _extend: function(fns) {
    for (var fn in fns) wrap(fn, fns[fn])
    return transform
  }
}

module.exports = transform._extend(Transform)
