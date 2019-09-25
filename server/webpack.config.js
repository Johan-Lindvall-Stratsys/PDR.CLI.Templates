const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
  mode: 'production',
  entry: {
    app: '../lib/##TAG_NAME##.js',
    pdr: '../frontend/node_modules/@stratsys/pdr/full-runtime'
  },
  output: {
    path: path.join(__dirname, '/dist'),
    publicPath: '__DOCKER_IMAGE_URL__/static/',
    filename: '[name].js',
    chunkFilename: 'chunk.[id].js',
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
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true
            }
          }
        ]
      }
    ]
  },
  performance: {
    hints: false
  }
}
