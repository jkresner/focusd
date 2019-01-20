var fn={},
    tmap={},
    rx={}

tmap.compact = {
  '    1. ':  / {2}~\d=/g,
  '\n+  '  :  / {2}~~\+~ {2}/g,
  '    t~ ':  / {2}~t=/g,
  '    n~ ':  / {2}~n=/g,
  '    s~ ':  / {2}~s=/g,
  '    p~ ':  / {2}~p=/g,
  '    #~ ':  / {2}~#=/g,
  '    …~ ':  / {2}~…=/g,
  '    ±~ ':  / {2}~±=/g,
  '    :~ ':  / {2}~:=/g,
  '    Ð~ ':  / {2}~Ð=/g,
  '    > ' :  / {2}~> /g
}
tmap.flag = {
  't': 'type',
  'n': 'name',
  's': 'src',
  '᜶': 'uri',
  '¶': 'preproc',
  'p': 'proc',
  '⁋': 'postproc',
  '#': 'id',
  '…': 'ellipt_ln',
  '±': 'slice',
  ':': 'map',
  'Ð': 'rm_decimal'
}

rx.rxSplit = /(?:\B\/`)/g
rx.rxFlags = /[igm]{0,3}$/
rx.rxTail = /`\//
rx.ol = /\n\d\. *\n/
rx.ul = /\n{2}\+ {2}/

//  console.log('line[%s] rpl[%s]'.dim, line.white,
//  line.replace(/(\d\. {1})/,'').trim().blue )
function asRegExps(line) {
  var rXs = line
    .replace(/\d\./,'')
    .trim()

  if (rXs == null) return []
  else {
    // LOG('asRX '+rXs)
    rXs = rXs.split(rx.rxSplit)
    return rXs == null ? [] : rXs
      .map(function(str) { return str.trim() })
      .filter(function(str) { return rx.rxTail.test(str) })
      .map(function(rX) {
        var flags = rX.match(rx.rxFlags)[0] || ''
        var source = rX.replace('`/'+flags,'')
        // LOG('asReg('+source+', "'+flags+'")')
        return new RegExp(source, flags)
      })
  }
} fn.asRegExps = asRegExps
// console.log('rX', rX)
// console.log('rx_ln['+line.trim().yellow+']')
// console.log('rX %s', rX.cyan)
// console.log('\nrx_src_flags %s /%s:', source.dim, flags.green)

fn.expand = function(mu) {
  for (var to in tmap.compact)
    mu = mu.replace(tmap.compact[to], '  \n'+to)

  return mu
    .replace(/~~\d~ {2}/g, '\n1.  ')
  //  .replace('\n','\\n')
    .trimEnd() // + '\n'
}

function blocks(src, newblock) {
  var b = []
  // LOG('blocks', newblock, '\n'+src+'\n-------------------'+'\n-------------------')
  var next = src.match(newblock).index
  while (next > -1) {
    // LOG('src==================\n'+src+'\n-------------------')
    src = src.replace(newblock, '')
    next = (src.match(newblock)||{index:-1}).index
    // LOG('block', '0-'+next+'/'+src.length)
    // LOG(src.slice(0, next-1), '\n___________________', src.slice(next, src.length))
    b.push(next < 0 ? src : src.slice(0, next-1))
    src = src.slice(next, src.length)
  }
  return b
}

fn.json = function(mu) {
  var jmup = {}
  var separator = mu.indexOf('\n\n+  ')
  var ol = '\n'+mu.slice(0, separator),
      ul = separator == -1 ? null 
              : mu.slice(separator, mu.length)

  // LOG('ol', rx.ol.source, ol)
  jmup.in = blocks(ol, rx.ol).map(function(block) {
    var inp = {}
    block
      .trim().split('\n')
      .filter(function(ln) { return ln.indexOf('~ ') > -1 })
      .map(function(ln) { return ln.split('~ ') })
      .forEach(function(l) {
        var key = l[0].trim()
        var attr = tmap.flag[key] || key 
        // LOG('in ~'+attr)
        inp[attr] = l[1].trim()
      })
    return inp
  })

  jmup.focus = !ul ? [] : blocks(ul, rx.ul).map(function(block) {
    var f = { mark: [] }
    block
      .replace('+','') // remove the first line
      .trim().split('\n')
      .forEach(function(l) {
        l = l.trimStart()
        if (/^> /.test(l)) {
          f.note = (f.note?f.note+'\n':'')+l.replace('> ','')
          // LOG(' ', l)
        } else if (/^\d./.test(l)) {
          f.mark.push(asRegExps(l))
          // LOG(' ', l.replace(/^\d. /,''))
        } else if (/^!\d/.test(l)) {
          f.color = l.replace(/^!/,'')
        } else
          LOG("not sure up with ln["+l+"]")          
          // f.mark.unshift(asRegExps(l))
      })
    return f
  })
// LOG('ul', ul, jmup.focus)

  return jmup
}

module.exports = fn
