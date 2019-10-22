const path = require('path')
const webpack = require('webpack')

module.exports = {
  publicPath: '/',
  outputDir: 'lib/',
  chainWebpack: config => {
    config.module
      .rule('vue')
      .use('vue-loader')
      .loader('vue-loader')
      .tap(options => {
        options.compilerOptions.preserveWhitespace = true
        return options
      })

    config.module.rule('svg').uses.clear()

    config.module
      .rule('less')
      .oneOf('vue-modules')
      .use('less-loader')
      .tap(options => {
        options.paths = [path.resolve(__dirname, 'node_modules'), path.resolve(__dirname, 'src')]
        return options
      })

    config.module
      .rule('svg')
      .use('url-loader')
      .loader('url-loader')
  },
  configureWebpack: config => {
    config.devtool = 'source-map'

    // We can safely ignore this since we lazy-load the application already
    config.performance = {
      hints: false
    }

    config.plugins.push(
      new webpack.DefinePlugin({
        VERSION: JSON.stringify(require('../package.json').version)
      })
    )

    if (config.output.libraryTarget) {
      if (config.externals && config.externals.vue) {
        // Vue should always be bundled, this should be handled by the --include-vue flag, if by any chance it comes here. Remove it.
        delete config.externals.vue
      }

      // A requirement for the frontend architecture to work is that the frontend application is bundled as a single chunk.
      config.plugins.push(
        new webpack.optimize.LimitChunkCountPlugin({
          maxChunks: 1
        })
      )
    }
  },
  css: { extract: false }
}
