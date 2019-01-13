const {join} = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const {HotModuleReplacementPlugin} = webpack

const dir_root = join(__dirname,'..','demo')
const dir_out = join(dir_root)

console.log(`
webpack --config: dev.pk.js`)

module.exports = {
  mode: 'development',
  entry: {
      index: join(dir_root,'app.js')
  },
  devtool: 'inline-source-map',
  devServer: {
    clientLogLevel: 'none',
    contentBase: './demo',
    noInfo: true,
    hot: true,
    port: 8060,
    stats: 'minimal'
  },
  plugins: [
    new HtmlWebpackPlugin({title:'Demo'}),
    new HotModuleReplacementPlugin()
  ],
  output: {
    filename: '[name].bundle.js',
    path: dir_out
  },
  module: {
    rules: [
      {
       test: /\.less$/,
       use: ['style-loader','css-loader','less-loader']
      }
    ]
  }
}
