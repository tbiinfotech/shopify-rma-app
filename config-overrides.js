const path = require('path')
const Dotenv = require('dotenv-webpack')
const rewireReactHotLoader = require('react-app-rewire-hot-loader')
const rewireCssModules = require('react-app-rewire-css-modules')

module.exports = function override(config, env) {
  config = rewireCssModules(config, env)

  // config.plugins = [new Dotenv()]

  config.resolve = {
    alias: {
      assets: path.resolve(__dirname, 'src/assets'),
      setup: path.resolve(__dirname, './src/setup/'),
      common: path.resolve(__dirname, './src/components/common/'),
      components: path.resolve(__dirname, './src/components/'),
      containers: path.resolve(__dirname, './src/containers/')
    }
  }

  config.devServer = {
    historyApiFallback: true,
    disableHostCheck: true,
    host: process.env.WEBPACK_HOST || 'localhost', // changed
    port: 8001, // Changed
    https: !process.env.DONT_SERVE_HTTPS
  }

  return rewireReactHotLoader(config, env)
}
