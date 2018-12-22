path = require('path')
fs = require('fs')
ops = { encoding: 'UTF-8' }
var md = {}
var json = {}

var dir_md = join(__dirname,'up/md')
var dir_js = join(__dirname,'up/js')

fs.readdirSync(dir_md, ops).forEach(file =>
  md[file.replace('.md','')] = fs
         .readFileSync(join(dir_md,file), ops)
         .trimEnd())

module.exports = {
  md, json
}
