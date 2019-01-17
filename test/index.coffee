SCREAM  = require('screamjs')
OPS     = {}

ONREADY = (test) ->
  console.log('TEST suite ready...'.green)
  test()


SCREAM(OPS).run(ONREADY)
