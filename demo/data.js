// 'law-cr80.md',
// 'law-ft87p3.md','law-ft87p4.md','law-ft87p6.md','law-ft87t.html',
// 'law-it87t.html','law-it87w.html',
// 'law-lm69t.html','law-lm69w.html',
// 'law-sm15p06.md','law-sm15s106.html',
// 'ptt_m.md','ptt_ms-harrassd.md','ptt_ms-vernacular.md','ptt_mt.md'
// ]


var __in = require('../test/fixt/in.md')
var _in = {};
[
// ,'law_sm15p07-10.md',
,'law_sm15p12-14.md',
// ,'law_sm15c01-2.md
// ,'doc_1704cash.md',
// ,'case_17mce0.md'
// ,'case_17mce1.md'
,'case_17mce2.md'
].forEach(function(id) { _in[id] = __in[id] })


module.exports = { _in:_in, _up: JSON.stringify({
  in: [
    { type:      'law',
      name:      'Strata Schemes Management Act 2015 Part 7-9',
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
}
