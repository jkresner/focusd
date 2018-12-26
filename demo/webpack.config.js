const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const {HotModuleReplacementPlugin} = webpack

console.log('\n--- START: webpack.config.js')


module.exports = {
  mode: 'development',
  entry: {
    demo: './index.app.js'
  },
  devtool: 'inline-source-map',
  devServer: {
    // contentBase: './dist',
    noInfo: true,
    hot: true,
    stats: 'minimal'
  },
  plugins: [
    // new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({title:'Demo'}),
    new HotModuleReplacementPlugin()
  ],
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist')
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
