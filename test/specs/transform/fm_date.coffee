IT "Format MM/DD/YYYY => DD MMM YY", ->
  r = tsf.fm_date "Test 1.1 date: 04/20/1992", "MM/DD/YYYY,DD MMM YY", =>
  expect(r).inc("Test 1.1 date: 20 Apr 92")
  r = tsf.fm_date "Test 1.2 date: 04/20 1992", "MM/DD/YYYY,DD MMM YY", =>
  expect(r).inc("Test 1.2 date: 04/20 1992")
  r = tsf.fm_date "Test 1.3 dates: 1990-04-17  1991-05-16", "YYYY-MM-DD,DD MMM YYYY", =>
  expect(r).inc("Test 1.3 dates: 17 Apr 1990  16 May 1991")  
  DONE()


IT "Format YYYY-MM-DD HH:mm:ss => YYYY-MM DD HH:00", ->
  r = tsf.fm_date "Test 2.1 date: 1922-02-01 19:11:22", "YYYY-MM-DD HH:mm:ss,YYYY-MM DD HH:00", =>
  expect(r).inc("Test 2.1 date: 1922-02 01 19:00")
  DONE()




