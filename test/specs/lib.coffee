lib = require('../../lib/transcribe')


module.exports = -> DESCRIBE 'Transcribe', ->


  IT 'RegExps', ->
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
      # console.log('[Rxs:%s] ==> %s', l.blue, "#{r.length}".green)
      expect(r.length).to.equal(src[j].length)
      for i in [0..r.length-1]
        if r.length > 0
          # console.log("src[#{j}][#{i}]", src[j])
          expect(r[i].source, "src[#{j}][#{i}]").to.equal(src[j][i])
          expect(r[i].flags, "flg[#{j}][#{i}]").to.equal(flg[j][i])

    toRX(ln) for ln in lns
    DONE()




  IT.skip 'Maps', ->
    rx1 = /~~\d~  /g
    r1 = '\n1.  '
    expect("[~~1~  ]".replace(rx1, r1)).inc('[\n1.  ]')
    expect("[~~1~  abc]".replace(rx1, r1)).inc('[\n1.  abc]')
    expect("[~~2~  bcd]".replace(rx1, r1)).inc('[\n1.  bcd]')
    expect("[~~1~  aaa  ~~2~  bbb]".replace(rx1, r1)).inc('[\n1.  aaa  \n1.  bbb]')
    DONE()


  IT 'Short hand', ->
    smu = "~~1~  ~t=email  ~n=Squash on 1 line  ~s=www.domain/url  ~…=34,92-94  ~p=fn3  ~~2~  ~t=doc  ~~+~  ~1=/`\\n[a-b]: *\\n`/  ~2=/`text select`/g  ~> ## header  ~> and p body  ~~+~  ~1=  ~2=/`abba`/ig  /`baba`/  ~> ### h3  ~> - li1  ~> - li2"
    {transcribe_1} = FIXTURE['up.md'].md
    tLns = transcribe_1.split('\n').map (l) => l.replace(/ /g,'_')
    exnd = lib.expand(smu)
    console.log('exnd'.yellow, exnd)
    eLns = exnd.split('\n').map (l) => l.replace(/ /g,'_')
    i = 0
    for ln in tLns
      expect(ln, "\n#{i+1}|[#{ln}]\n#{i+1}|[#{eLns[i]}]\n\n#{tLns.join('\n')}\n\n#{eLns.join('\n')}").equal(eLns[i])
      i++
    # console.log(exp['+transcribe_1+']')
    # console.log(expanded)
    # expect(expanded.replace(/ /g,'_')).to.inc(
           # transcribe_1.replace(/ /g,'_') )
    muj = lib.json(transcribe_1)
    #console.log('muj', muj)
    DONE()

  # IT 'To JSON', ->
  #   mup = FIXTURE.up.md.transcribe_1
  #   expect(lib.expand(smup).replace(/ /g,'_'))
  #     .to.inc(mup.replace(/ /g,'_'))
  #   DONE()
