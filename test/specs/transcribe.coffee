hr = "\t---------------------------------------------------------------------------\n"
lib = require('../../lib/transcribe')
module.exports = -> 


  IT 'detect nested RegExp arrays', ->
    lns = ["1. /`\\n[a-b]: *\\n`/  ",
           "1. /`text select`/g  ",
           "  /`text select`/i",
           "1.  ",
           "1. /`abba`/gi  /`baba`/"]
    src = [ ['\\n[a-b]: *\\n'],
            ['text select'],
            ['text select'],
            [],
            ['abba','baba'] ]
    flg = [ [''],['g'],['i'],[''],['gi',''] ]
    j = -1
    toRX = (l) ->
      j++
      r = lib.asRegExps(l)
      expect(r.length).to.exist
      expect(r.length).to.equal(src[j].length)
      if r.length > 0
        for i in [0..r.length-1]
          expect(r[i].source, "src[#{j}][#{i}]").to.equal(src[j][i])
          expect(r[i].flags, "flg[#{j}][#{i}]").to.equal(flg[j][i])
    toRX(ln) for ln in lns
    DONE()


  IT 'maps short => full md markup', ->
    rx1 = /~~\d~  /g
    r1 = '\n1.  '
    expect("[~~1~  ]".replace(rx1, r1)).inc('[\n1.  ]')
    expect("[~~1~  abc]".replace(rx1, r1)).inc('[\n1.  abc]')
    expect("[~~2~  bcd]".replace(rx1, r1)).inc('[\n1.  bcd]')
    expect("[~~1~  aaa  ~~2~  bbb]".replace(rx1, r1)).inc('[\n1.  aaa  \n1.  bbb]')
    DONE()


  IT 'maps (single line) compact => json markup', ->
    smu = "~~1~  ~t=email  ~n=Squash on 1 line  ~s=www.domain/url  ~…=34,92-94  ~p=fn3  ~~2~  ~t=doc  ~~+~  ~1=/`\\n[a-b]: *\\n`/  ~2=/`text select`/g  ~> ## header  ~> and p body  ~~+~  ~1=  ~2=/`abba`/ig  /`baba`/  ~> ### h3  ~> - li1  ~> - li2"
    transcribe_1 = FIXTURE['up.md']['it-transcribe-01.md']
    tLns = transcribe_1.split('\n')
    exnd = lib.expand(smu)
    eLns = exnd.split('\n')
    
    diff = "\n"+hr+hr    
    diff += "\t#{++t}\t".dim+"#{tLns[t]}".replace(/ /g,'_'.dim).yellow + "\n" for t in [0..tLns.length-1]
    diff += hr
    diff += "\t#{++e}\t".dim+"#{eLns[e]}".replace(/ /g,'_'.dim).green + "\n" for e in [0..eLns.length-1] 
    for i in [0..tLns.length]
      tLn = tLns[i]
      eLn = eLns[i]
      expect(tLn, "Line #{i}:\n\n"+hr+"\t#{i}\t^#{tLn}$\n".yellow+hr+"\t#{i}\t^#{eLn}$\n".magenta+hr+'\n\n'+diff+hr+hr+'\n\n').to.equal(eLn)
      i++
    DONE()


  IT 'json from md markup', ->
    j = lib.json(FIXTURE['up.md']['it-transcribe-01.md'])
    expect(j.in.length).to.equal(2)
    expect(j.in[0].type).to.equal('email')    
    expect(j.in[1].type).to.equal('doc')        
    expect(j.focus.length).to.equal(2)
    expect(j.focus[0].mark).length(2)
    expect(j.focus[0].mark[0]).length(1)
    expect(j.focus[0].mark[1]).length(1)
    expect(j.focus[0].note).to.equal("""## header  
and p body""")    
    expect(j.focus[1].mark).length(2)
    expect(j.focus[1].mark[0]).length(0)
    expect(j.focus[1].mark[1]).length(2) 
    expect(j.focus[1].note).to.equal("""### h3  
- li1  
- li2""")    
    DONE()
