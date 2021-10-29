const path = require('path')

module.exports = {
  lintOnSave: false,
  chainWebpack: config => {
    const docxloadPath = path.join(__dirname, '..', '..', 'dist')
    config.resolve.alias.set('@docxload', docxloadPath)
  }
}
