SCREAM  = require('screamjs')
OPS     = {}

ONREADY = (test) ->
  console.log('TEST suite ready...'.green)
  global.LOG = console.log
  test()


SCREAM(OPS).run(ONREADY)
