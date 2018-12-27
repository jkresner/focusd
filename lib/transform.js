var Transform = {}

var rx = {}
// rx.moment = function(s) { return new RegExp(s
//     .replace('MM','([0][1-9]|[1][0-2])')
//     .replace('YYYY','[1-2][0-9][0-9][0-9]')
//     .replace('DD','([0][1-9]|[1-2][0-9]|[3][0-1])'))
// }
rx.escr = /[-\/\\^$*+?.()|[\]{}]/g
rx.esc = function(s) {
  return s ? new RegExp(s.replace(rx.escr, '\\$&'),'g') : null
}
rx.md = { partial: {
  start: /\-\-\-\n### /g,
  ins: /\[#[A-Z]\]/g }
}

Transform.ellipt_map = function(src, map, ops) {
  var r = src.toString()
  var keys = Object.keys(map)
  for (var k=0; k<keys.length; k++) {
    var start = src.indexOf(keys[k])
    var end =  src.indexOf(map[keys[k]])
    if (start > -1 && end > -1 && end > start)
      r = r.slice(0, start) + ' ... ' + r.slice(end, r.lengh)
  }
  return r
}

Transform.ellipt_lines = function(src, lns, ops) {
  var removed = 0
  var r = src.toString().split('\n')
  var ellips = lns.split(',')
  for (var l=0; l<ellips.length; l++) {
    var elt = ellips[l]
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

Transform.mapcrypt = function(src, maps, ops) {
//  var maps = Object.values(arguments)
//  var src = maps.shift()
  var r = src.toString()
  if (!src.replace) return
  if (!maps.length) return src
  maps.forEach(function(map) {
    // console.log('mapcrypt.map'.dim, map)
    for (var mapped in map)
      r = r.replace(map[mapped], mapped)
  })
  return r
}

Transform.abbrev = function(src, map, ops) {
  var r = src.toString()
  for (var abbr in map)
    r = r.replace(map[abbr], '<abbr>'+abbr+'</abbr>')
  return r
}

/*
Transform.convert_datetime = function(input, format, ops, cb) {
  var r = input.toString(),
   from = format.from,
     to = format.to,
     tz = ops.tz,
     fn = ops.transform.datetime ||
          function(dt) { return moment().format('D-MMM`YY') }
  var match = ops.match || rx.moment(ops.from)
  return r
}
*/

Transform.remove_decimals = function(input) {
  return input.replace(/(\.\d+)+/g,'')
}

Transform.mark = function(input, params, ops) {
  var r = input.toString()
  var focus = params.focus
  var idx = params.idx
  var m=0
  focus.forEach(function(f) {
    var color = 'hi'+(f.color||0)
    var mkTag = '<mark class="'+color+'"><i>'+(++m)+'</i>'
    f.mark = f.mark || []
    f.mark.forEach(function(select) {
      // console.log('f.mark['+m+']', select)
      var match = rx.esc(typeof select !== 'string' ? select[idx] : select)
      r = r.replace(match, mkTag+select+'</mark>')
    })
  })
  return r
}

/**
 */
Transform.annotations = function(mup, params, ops) {
  var r = '<li>No arguments yet...</li>'
  var fc = mup.focus
  if (fc) {
    r = ''
    for (var i=0; i<fc.length; i++) {
      var color = 'hi'+(fc[i].color||0)
      var note = fc[i].note||''
      r += '<li class="'+color+'">'+note+'</li>'
    }
  }
  return '<ol>'+r+'</ol>'
}

/*

[#<id>]

---
### <id>

*/
Transform.md_partial_ins = function(md, params, ops) {
  var parts = md.split(rx.md.partial.start)
  var r = parts[0]
  for (var i=1; i<parts.length; i++) {
    var lines = parts[i].split('\n')
    var pid = lines.shift().trim()
    var at = new RegExp('\\[#'+pid+'\\]','g')
    var html = ops.compile.md.toHtml(lines
      .join('\n'))
      .replace(/\\n/g,'<br />')
      .replace(/\n/g,'')
    r = r.replace(at, html)
  }       // .trim()
  return r
}

/*
Transform.md_toStdout = function(input, params, ops) {
  throw Error("Not yet implemented")
} */

Transform.md_toHtml = function(input, params, ops) {
  var r = ops.compile.md.toHtml(input)
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

var transform = { }
transform._extend = function(fns) {
  function wrap(n, fn) {
    transform[n] = function() {
      var r={};
      var args = [...arguments]
      var cb = args.pop(),
          src = args.shift(),
          ops = (args.length>1?args.pop():args[0]),
          prms = args[0]
      if (typeof src === 'string')
        console.log('in'+ops.idx+'['+ops.stage+']fn:'+n, src.split('\n')[1], prms, ops.scope)
      else
        console.log('in'+ops.idx+'['+ops.stage+']fn:'+n, src, prms, ops.scope)
      try {
        r[n] = fn.apply(this, arguments)
      } catch (e) {
        console.log('ERR: focusd.transform.'+n, e, ops, prms, src)
        if (!ops.silent) throw new Error('Failed transform.'+n + e.toString())
      }
      cb(null,r)
      return r[n]
    }
  }
  for (var fn in fns) wrap(fn, fns[fn])
  return transform
}

module.exports = transform._extend(Transform)
