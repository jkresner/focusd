global.tsf = require('../../lib/transform')
module.exports = -> 

   DESCRIBE "ellipt_ln", () => require('./transform/ellipt_ln')
   DESCRIBE "mp_ellipt", () => #require('./transform/mp_ellipt')
   DESCRIBE "mp_crypt", () => #require('./transform/mp_crypt')
   DESCRIBE "mp_abbr", () => #require('./transform/mp_abbr')
   DESCRIBE "rm_decimal", () => #require('./transform/rm_decimal')
   DESCRIBE "mark", () => #require('./transform/mark')
   DESCRIBE "annotations", () => #require('./transform/annotations')
   DESCRIBE "ins_part", () => #require('./transform/ins_part') 
   DESCRIBE "md_toHtml", () => #require('./transform/md_toHtml') 
