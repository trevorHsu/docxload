const { resolve } = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: {
    index: './src/index.js'
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
      }
    ]
  },
  output: {
    filename: 'index.js',
    path: resolve(__dirname, 'dist'),
    libraryTarget: "umd",
    library: "docxload",
    globalObject: "this",
    publicPath: './',
    environment: {
      arrowFunction: false
    }
  },
  plugins: [
    new CleanWebpackPlugin()
  ],
  optimization: {
    minimizer: [new TerserPlugin({
      extractComments: false
    })]
  }
}
