var map = { c: 'case', d: 'doc', l: 'law', i: 'img', w: 'www', m: 'mail' }

var slug = window.location.pathname.replace('/','').split('/')
var up = slug[1] || 'all'
var set = slug[0]

var fsUP = require('../fxt'+(set?'/set/'+set:'')+'/up.md')
var UP = fsUP[up+'.md'] || fsUP['noop']

var fsIN = require('../fxt'+(set?'/set/'+set:'')+'/in.md')  
var IN = UP.split('\n')
  .filter(function(ln) { return ln.indexOf('    #~ ') == 0 })
  .map(function(ln) { 
    var id = ln.replace('    #~ ','')
    return { id: id.replace(/(c|d|l|i|w|m)_/, function(match, idx) {
        return map[match.replace('_','')]+'_'
      }), 
      md: fsIN[id+'.md'] }
  })

// console.log(set+':UP', UP, '...IN: ', IN)

// fsIN['i_1907soccaroo.md'] = '![Soccaroos PPT goal](./img/1907soccaroo.png)'
// fsIN['i_1802strict.md'] = '![Strict Maintenance](./img/1802strict.png)'

module.exports = { in: IN,  up: UP }
