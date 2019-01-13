var fsUP = require('../fxt/set/ptt/up.md')
var fsIN = Object.assign({},
  // require('../fxt/in.md'), 
  require('../fxt/set/ptt/in.md')
)


var qs = window.location.search
var k = '03_pol'
if (/up=/.test(qs) && fsUP[qs.split('up=')[1]+'.md']) 
  k = qs.split('up=')[1]

var UP = fsUP[k+'.md']

var _in = { 
  "01c_arg1min": ['m_ptt','m_ptt','m_ptt','m_ptt','l_it87t'],
  "03_pol": ['m_ptt','l_cv07p01-3','l_cc95p10.6','d_1806boe','d_1901attend'],
// 'd_1704cash',
//,'m_s_harrassd'
//,'m_s_vernacular'
// ,'m_t_ants' 
      
  "04b_timeline": ['d_1804afdit','d_1807advice']
}

var IN = _in[k]
  .map(function(key) { return { md: fsIN[key+'.md'], id: key
      .replace('c_','case_')
      .replace('d_','doc_')
      .replace('l_','law_')
      .replace('i_','img_')
      .replace('w_','www_')
      .replace('m_','mail_') } })


module.exports = { in: IN,  up: UP }
