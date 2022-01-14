const Dotenv = require('dotenv-webpack')
const HtmlWebPackPlugin = require('html-webpack-plugin')
// const webpack = require('webpack')
const path = require('path')

const htmlWebpackPlugin = new HtmlWebPackPlugin({
  template: './src/index.html',
  filename: './index.html',
  favicon: './src/assets/images/favicon.ico',
  minify: {
    removeComments: true,
    collapseWhitespace: true,
    removeRedundantAttributes: true,
    useShortDoctype: true,
    removeEmptyAttributes: true,
    removeStyleLinkTypeAttributes: true,
    keepClosingSlash: true,
    minifyJS: true,
    minifyCSS: true,
    minifyURLs: true
  },
  inject: true
})

module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader', 'eslint-loader']
      },
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        exclude: /node_modules/,
        use: ['file-loader']
      }
    ]
  },
  mode: 'development',
  plugins: [htmlWebpackPlugin, new Dotenv()],
  optimization: {
    minimize: true,
    namedChunks: true
  },
  devServer: {
    historyApiFallback: true,
    disableHostCheck: true,
    host: process.env.WEBPACK_HOST || 'localhost', // changed
    port: 8001, // Changed
    https: !process.env.DONT_SERVE_HTTPS
  },
  resolve: {
    alias: {
      assets: path.resolve(__dirname, './src/assets/'),
      setup: path.resolve(__dirname, './src/setup/'),
      common: path.resolve(__dirname, './src/components/common/'),
      components: path.resolve(__dirname, './src/components/'),
      containers: path.resolve(__dirname, './src/containers/')
    }
  }
}
