const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
  mode: 'production',
  entry: '../lib/##TAG_NAME##.js',
  output: {
    path: path.join(__dirname, '/dist'),
    publicPath: '__DOCKER_IMAGE_URL__/static/',
    filename: 'app.js',
    chunkFilename: '[name].application-chunk.[hash].js',
    library: '##LIBRARY_NAME##'
  },
  plugins: [new CleanWebpackPlugin()],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env'],
          plugins: ['@babel/plugin-syntax-dynamic-import']
        }
      }
    ]
  },
  performance: {
    hints: false
  }
}
