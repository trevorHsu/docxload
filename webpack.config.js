const { resolve } = require('path')
const devConf = require('./webpack.dev.conf')
const prodConf = require('./webpack.prod.conf')
const usingConf = process.env.NODE_ENV === 'development' ? devConf : prodConf

module.exports = Object.assign({
  resolve: {
    alias: {
      '@src': resolve(__dirname, 'src')
    },
    extensions: ['.js']
  }
}, usingConf)
