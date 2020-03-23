lib = require('../../lib/focusd').fig
module.exports = -> 


  IT.only 'Render doc without annotations', ->
    raw = FIXTURE['in.md']['it-doc.md']
    r = lib(raw,'doc','it-doc',{post:['rm_decimal']})
    console.log r
    DONE()
