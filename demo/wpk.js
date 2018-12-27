const {join} = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const {HotModuleReplacementPlugin} = webpack

const dir_root = __dirname
const dir_out = join(dir_root, 'dist')

console.log(`
--- config: webpack`)

module.exports = {
  mode: 'development',
  entry: {
      index: join(dir_root,'index.js')
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
    // new CleanWebpackPlugin(['dist']),
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
      },{
       test: /\.css$/,
       use: ['style-loader','css-loader']
      }
    ]
  }
}
