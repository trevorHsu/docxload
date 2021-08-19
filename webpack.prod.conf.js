const { resolve } = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
  mode: 'production',
  entry: {
    index: './src/index.js'
  },
  module: {
    rules: [
      // {
      //   test: /\.js$/,
      //   exclude: /node_modules/,
      //   use: [
      //     {
      //       loader: 'babel-loader',
      //       options: {
      //         presets: [
      //           [
      //             '@babel/preset-env',
      //             {
      //               modules: 'amd',
      //               targets: {
      //                 ie: '11',
      //               },
      //               corejs: '3',
      //               useBuiltIns: 'usage'
      //             }
      //           ]
      //         ]
      //       }
      //     }
      //   ]
      // }
    ]
  },
  output: {
    filename: 'index.js',
    path: resolve(__dirname, 'dist'),
    publicPath: './',
    environment: {
      arrowFunction: false
    }
  },
  plugins: [
    new CleanWebpackPlugin()
  ]
}
