IT.skip "Remove single line", ->
  md = FIXTURE['in.md']['it-ellipt_ln.md']
  r = tsf.ellipt_ln(md, '4', ->)
  expect(r).inc("# tsttxt\nLN2\nLN3\n...\nLN5\nLN6\nLN7\nLN8\nLN9")
  DONE()


IT.skip "Remove range", ->
  md = FIXTURE['in.md']['it-ellipt_ln.md']
  r = tsf.ellipt_ln(md, '3-5', ->)
  expect(r).inc("# tsttxt\nLN2\n...\nLN6\nLN7\nLN8\nLN9")
  DONE()


IT.skip "Remove ranges", ->
  md = FIXTURE['in.md']['it-ellipt_ln.md']
  r = tsf.ellipt_ln(md, '1-3,7-9', ->)
  expect(r).inc("...\nLN4\nLN5\nLN6\n...")
  DONE()


IT.skip "Remove mix", ->
  md = FIXTURE['in.md']['it-ellipt_ln.md']
  r = tsf.ellipt_ln(md, '4,6-7', ->)
  expect(r).inc("# tsttxt\nLN2\nLN3\n...\nLN5\n...\nLN8\nLN9")
  DONE()

