var short_map = {
  "    1. " : /  ~\d=/g,
  "\n+  "   : /  ~~\+~  /g,
  "    t~ " : /  ~t=/g,
  "    n~ " : /  ~n=/g,
  "    s~ " : /  ~s=/g,
  "    p~ " : /  ~p=/g,
  "    …~ " : /  ~…=/g,
  "    ±~ " : /  ~±=/g,
  "    :~ " : /  ~:=/g,
  "    Ð~ " : /  ~Ð=/g,
  "    > "  : /  ~> /g
}
var short_keys = Object.keys(short_map)

var long_map = {
 't': 'type',
 'n': 'name',
 's': 'src',
 'p': 'process',
 '…': 'ellipt',
 '±': 'slice',
 ':': 'map',
 'Ð': 'delete'
}

var rx_rxSplit = /(?:\B\/`)/g
var rx_rxFlags = /[igm]{0,3}$/
var rx_rxTail = /`\//


var fns = {


  asRegExps(line) {
    console.log('line[%s] rpl[%s]'.dim, line.white,
        line.replace(/(\d\. )/,'').trim().blue )
    var rXs = line
      .replace(/(\d\. )/,'')
      .trim()

    if (rXs == null) return []
    else {
      rXs = rXs.split(rx_rxSplit)
      return rXs == null ? [] : rXs
         .map(function(str) { return str.trim() })
         .filter(function(str) {
            return rx_rxTail.test(str) })
         .map(function(rX) {
           var flags = rX.match(rx_rxFlags)[0]
           var source = rX.replace('`/'+flags,'')
           // console.log('rX', rX)
           // console.log('rx_ln['+line.trim().yellow+']')
           // console.log('rX %s', rX.cyan)
           // console.log('\nrx_src_flags %s /%s:', source.dim, flags.green)
           return new RegExp(source, flags)
         })
    }
  },


  expand(mu) {
    short_keys.forEach(function(to) {
      var pattn = short_map[to]
      // console.log(`rpl(%s,'%s')`, pattn, to)
      mu = mu.replace(pattn, '  \n'+to)
    })
    mu = mu.replace(/~~\d~  /g, "\n1.  ")

           // .replace('\n','\\n')


    return mu.trimEnd()
     //'\n'+
      // +'\n'
  },

  json(mu) {
    var jmup = { in: [] }
    var ol_end = mu.indexOf(`\n\n+ `)
    var ol = mu.slice(0, ol_end),
        ul = mu.slice(ol_end, mu.length)
    var ol_rx = `\n1\.  \n`,
        ul_rx = `\n\n+  `
    var inps = [], focs = []
    var next = ol.indexOf(ol_rx);

    while (next > -1) {
      ol = ol.replace(ol_rx, '')
      next = ol.indexOf(ol_rx)
      var li = next > -1 ? ol.slice(0,next) : ol
      ol = ol.slice(next,ol.length)
      // console.log('li::'+li+'::[ol]', ol, '\nnext', next, )
      inps.push(li)
    }

    next = ul.indexOf(ul_rx)
    while (next >= 0) {
      ul = ul.replace(ul_rx,'')
      var next = ul.indexOf(ul_rx)
      var li = next == -1 ? ul : ul.slice(0,next)
      ul = ul.slice(next, ul.length)
      focs.push(li)
    }

    inps.forEach(function(i) {
      var input = {}
      i.trim().split('\n')
              .map(function(ln) { return ln.split('~ ') })
              .forEach(function(l) {
//        console.log('l',l)
        input[long_map[l[0].trim()]] = l[1].trim()
                     })
      jmup.in.push(input)
    })

    // console.log('focs', focs)

    focs.forEach(function(f) {
      console.log('___focs.f', f)
      jmup.focus =  jmup.focus || []
      var fcd = { mark: [] }
      f.trim().split('\n').forEach(function(l) {
        l = l.trimStart()
        // console.log('l', l)
        if (/^> /.test(l)) fcd.note = (fcd.note||'')+l.replace('> ','\n')
        else if (/^\d. /.test(l))
          fcd.mark.push(fns.asRegExps(l))
        else if (l != '')
          fcd.mark.unshift(fns.asRegExps(l))
      })
      //console.log('fcd',fcd)
      jmup.focus.push(fcd)
    })

    console.log('focus', jmup.focus)

    return jmup
  }

}


module.exports = fns
