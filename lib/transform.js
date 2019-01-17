

var Transform = {}

var rx = { escr: /[-\/\\^$*+?.()|[\]{}]/g, md: {} }
rx.md.partial = { start: /\-\-\-\n### /g, ins: /\[#[A-Z]\]/g }
rx.esc = function(s) {
  return (s||{}).replace ? new RegExp(s.replace(rx.escr, '\\$&'),'g') : null
}

Transform.ellipt_ln = function(r, lns, ops) {
  var l = r.split('\n')
  var removed = 0
  for (var i=0; i<lns.length; i++) {
    var elt = lns[i]
    var start = 0, end = 0
    if (/^\d+\-\d+$/.test(elt)) {
      var idx = elt.split('-')
      start = parseInt(idx[0])-1
      end = parseInt(idx[1])
    } else if (/^\d+$/.test(elt)) {
      start = parseInt(elt)-1
      end = start+1
    }
    if (end > start) {
      l = l.slice(0, start-removed).concat( ['...'], l.slice(end-removed) )
      removed += (end-start)-1
    }
  }
  return l.join('\n')
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

/*
 */
Transform.fm_date = function(r, map, ops) {
  var from = map[0], to = map[1], tz = map[2]
  if (tz) throw Error("fm_data tz - Not implemented")

  var dateFm = new RegExp(from
    .replace('YYYY','[1-2]\\d{3}')
    .replace('YY','\\d{2}')
    .replace('MM','(0\\d|1[0-2])')
    .replace('DD','(0\\d|3[0-1]|[1-2]\\d)')
    .replace('HH','([0-1]\\d|2[0-4])')
    .replace('mm','[0-5]\\d')
    .replace('ss','[0-5]\\d'), 'g')
  
  r = r.replace(dateFm, function(match, idx, src) {
    return moment(match, from).format(to) 
  })

  return r
}
Transform['⽉'] = Transform.fm_date

/*
 */
Transform.rm_decimal = function(r, params, ops) {
  return r.replace(/(\.\d+)+/g,'')
}
Transform['Ð'] = Transform.rm_decimals

/*
 */
function hi(tag, inner, obj) {
  var elCss = ' class="hi' + (obj.color||1) + '"',
      elId = obj.id ? ' id="'+obj.id+'" ' : ''
  var elm = '<'+tag+elCss+elId+'>'+(inner||'')+'</'+tag+'>'
  return elm
}

/*
 */
Transform.mark = function(r, p, ops) {
  LOG('=> mark '+ops.scope+'in'+ops.idx, ops.stage, p.focus)
  var m=0;
  var idxMarks = {}
  p.focus.forEach(function(f) {
    m++;
    if (f.mark[ops.idx]) 
      idxMarks[m] = { mark: f.mark[ops.idx], color: f.color || '1' }
  })
  LOG('==> in'+ops.scope+'in'+ops.idx, idxMarks)

  for (var pos in idxMarks)
    idxMarks[pos].mark.forEach(function(select) {
      var rxMatch = typeof select === 'string' ? rx.esc(select) : select
      // var matched = []
      // console.log('f['+pos+']', select, select.test(r), r.match(select))
      r = r.replace(rxMatch, function(match, idx, src) {
        console.log('match:', match, 'at: ', idx)
        return hi('mark', '<i>'+pos+'</i>'+match, idxMarks[pos])
      })
      // while ((m = rxMatch.exec(r)) !== null) {
      //   var match = select.exec(r)
      //   if (!match) console.log('mark.warning null match', ops.idx, select)
      //   LOG('match pos:'+pos, match);
      //   }) 
      // }
    })
    
  // console.log('mark(ed)', r)
  return r
}

/*
 */
Transform.annotations = function(r, p, ops) {
  // LOG('annotations.r', r)
  // LOG('annotations.f', p.focus)
  // LOG('annotations.o', ops)
  if (((p||{}).focus||[]).length < 1) return r

  var scope = ops.scope || ''
  var fc = p.focus
  var li = ''

  for (var i=0; i<fc.length; i++)
    li += hi('li', toHtml(fc[i].note||''), fc[i])

  return (r||'') +'<article id="'+scope+'"><ol>'+li+'</ol></article>'
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
 */
Transform.md_toPdf = function(r, p, ops) {
  throw Error("Not implemented")
}

/*
 */
Transform.md_toHtml = function(r, p, ops) {
  return toHtml(r)
    .replace(/ {2}\\n\\n/g, '<br /><br />')
    .replace(/ {2}\\n/g, '<br />')
    .replace(/\>\\n/g, '><br />')
    .replace(/\>\\n\\n/g, '><br />')
}

/*
 */
Transform.dev_html = function(r, p, ops) {
  return r
    .replace(/\n\<\//g, '</')
    .replace(/\n\<tr\>/g, '\n  <tr>')
    .replace(/\n\<tbody\>\<tr\>/g, '<tbody>\n  <tr>')
    .replace(/<th>/g, '    <th>')
    .replace(/<th a/g, '    <th a')
    .replace(/<td>/g, '    <td>')
    .replace(/\<table\>\n\<thead\>/g, '\n<table><thead>')
}

/*
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
