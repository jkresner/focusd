const {join} = require('path')
const webpack = require('webpack')

const dir_root = join(__dirname,'..')
const dir_out = dir_root

console.log(`
webpack --config: dist.pk.js`)

module.exports = {
  mode: 'production',
  entry: {
    'focusd.js': join(dir_root,'index.js')
  },
  output: {
    filename: '[name]',
    path: dir_out
  }
}
