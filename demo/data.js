var map = { c: 'case', d: 'doc', l: 'law', i: 'img', w: 'www', m: 'mail' }


var slug = window.location.pathname.replace('/','').split('/')
var set = slug[0] || '..'
var up = slug[1] || 'all'

var fsUP = require('../fxt/set/'+set+'/up.md')
var fsIN = require('../fxt/set/'+set+'/in.md')  


var UP = fsUP[up+'.md'] || fsUP['noop']

var IN = UP.split('\n')
  .filter(function(ln) { return ln.indexOf('    #~ ') == 0 })
  .map(function(ln) { 
    var id = ln.replace('    #~ ','')
    // console.log(ln, 'map', id+'.md')
    // console.log(id+'.md', Object.keys(fsIN), fsIN[id+'.md'])
    return { id: id.replace(/(c|d|l|i|w|m)_/, function(match, idx) {
        return map[match.replace('_','')]+'_'
      }), 
      md: fsIN[id+'.md'] }
  })

// console.log(set+':UP', UP, '...IN: ', IN)

// fsIN['i_1907soccaroo.md'] = '![Soccaroos PPT goal](./img/1907soccaroo.png)'
// fsIN['i_1802strict.md'] = '![Strict Maintenance](./img/1802strict.png)'

// var _in = { 
  // 'all': ['d_1812crtord']
  // "01c_arg1min": ['m_ptt','l_it87w','m_ptt','m_ptt','m_ptt','w_urbandic','i_1907soccaroo','i_1802soccaroo'],
  // "03_pol": ['m_ptt','l_cv07p01-3','l_cc95p10.6','d_1806boe','d_1901attend'],
// 'd_1704cash',
//,'m_s_harrassd'
//,'m_s_vernacular'
// ,'m_t_ants' 
  // "04b_timeline": ['d_1804afdit','d_1807advice']
//}

module.exports = { in: IN,  up: UP }
