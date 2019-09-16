/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path')
const merge = require('webpack-merge')
const common = require('./webpack.common.js')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = merge(common, {
  mode: 'production',
  entry: './src/app.ts',
  output: {
    filename: 'app.common.js',
    library: 'app',
    libraryTarget: 'commonjs',
    path: path.join(__dirname, '/lib')
  },
  devtool: 'source-map',
  plugins: [new CleanWebpackPlugin()]
})
