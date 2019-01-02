var __in = Object.assign(
  require('../test/fixt/in.md'),
  require('../test/fixt/set/ptt/in.md')
)


var _in = [
// ,'c_17mce0'
// ,'c_17mce1'
// ,'c_17mce2'
// ,'c_17shm0'
// ,'c_18shm0'
// ,'l_ft87p03-7'
// ,'l_it87t'
// ,'l_sm15p06'
// ,'l_sm15p07-10'
// ,'l_sm15p12-14'
// ,'l_sm15c01-2'
'd_1704cash',
'm_ptt',
//,'m_s_harrassd'
//,'m_s_vernacular'
// ,'m_t_ants'
'l_474.15',
'l_cv07p01-3',
'd_1806boe',
'd_1807attend'
].map(function(key) { return { 
    md:  __in[key+'.md'],
    id:  key
      .replace('c_','case_')
      .replace('d_','doc_')
      .replace('l_','law_')
      .replace('i_','img_')
      .replace('m_','mail_') 
  }
})


var _up = JSON.stringify({
  in: [
    { type:      'law',
      name:      'Intepretation Act 1987 Table of Contents',
      baseUrl:   'https://www.legislation.nsw.gov.au/~/view/act/1987/15'
    },
    { type:      'law',
      name:      'Strata Schemes Management Act 2015 Sch 1-1',
    },
    { type:      'case',
      name:      'Shum meta',
    },
    { type:      'law',
      name:      'Strata Schemes Management Act 2015 Part 7-10',
    },
    { type:      'case',
      name:      'McElwain part 2',
      ol_start:  '27:the-pleading',
    },    
    { type:      'case',
      name:      'McElwain meta',
    },
    { type:      'case',
      name:      'McElwain part 1',
    },
    { type:      'doc',
      name:      'SP13385 Cash',
    },
    { type:      'law', 
      name:      'legislation.nsw.gov',            
      pre:       ['law_stripHtml']
    }
  ],
  focus: [
//    { note: 'not`in heres yet', mark: [] }
  ]
}, null, ' ')


module.exports = { in: _in, up: _up }
