const { resolve } = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
  mode: 'development',
  entry: {
    index: './src/index.js',
    test: './test/index.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            plugins: ['@babel/plugin-transform-runtime'],
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader'
        ]
      }
    ]
  },
  output: {
    filename: '[name].[chunkhash].js',
    path: resolve(__dirname, 'dist'),
    environment: {
      arrowFunction: false
    }
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: './test/page/index.html',
      filename: 'index.html',
      hash: true
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css'
    })
  ],
  devtool: 'source-map',
  devServer: {
    compress: true,
    inline: true,
    hot: true
  }
}
