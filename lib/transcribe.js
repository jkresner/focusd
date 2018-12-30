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
  'p': 'process',
  '…': 'ellipt',
  '±': 'slice',
  ':': 'map',
  'Ð': 'delete'
}

rx.rxSplit = /(?:\B\/`)/g
rx.rxFlags = /[igm]{0,3}$/
rx.rxTail = /`\//
rx.ol = '\n1\.  \n'
rx.ul = '\n\n+  '

//  console.log('line[%s] rpl[%s]'.dim, line.white,
//  line.replace(/(\d\. {1})/,'').trim().blue )
fn.asRegExps = function(line) {
  var rXs = line
    .replace(/(\d\. {1})/,'')
    .trim()

  if (rXs == null) return []
  else {
    rXs = rXs.split(rx.rxSplit)
    return rXs == null ? [] : rXs
      .map(function(str) { return str.trim() })
      .filter(function(str) { return rx.rxTail.test(str) })
      .map(function(rX) {
        var flags = rX.match(rx.rxFlags)[0]
        var source = rX.replace('`/'+flags,'')
        return new RegExp(source, flags)
      })
  }
}
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
  var next = src.indexOf(newblock)
  while (next > -1) {
    src = src.replace(newblock, '')
    next = src.indexOf(newblock)
    b.push(next < 0 ? src : src.slice(0, next))
    src = src.slice(next, src.length)
  }
  return b
}

fn.json = function(mu) {
  var jmup = {}
  var separator = mu.indexOf('\n\n+ ')
  var ol = mu.slice(0, separator),
      ul = mu.slice(separator, mu.length)

  jmup.in = blocks(ol, rx.ol).map(function(block) {
    var inp = {}
    block
      .trim().split('\n')
      .map(function(ln) { return ln.split('~ ') })
      .forEach(function(l) {
        inp[tmap.compact[l[0].trim()]] = l[1].trim()
      })
    return inp
  })

  jmup.focus = blocks(ul, rx.ul).map(function(block) {
    var f = { mark: [] }
    block
      .trim().split('\n')
      .forEach(function(l) {
        l = l.trimStart()
        if (/^> /.test(l))
          f.note = (f.note||'')+l.replace('> ','\n')
        else if (/^\d. /.test(l))
          f.mark.push(fn.asRegExps(l))
        else if (l !== '')
          f.mark.unshift(fn.asRegExps(l))
      })
    return f
  })

  return jmup
}

module.exports = fn
