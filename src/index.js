import Complier from './Complier'
import Export from './Export'

const getExportOption = function(option) {
  if (typeof option === 'string') {
    option = { fileName: option }
  }

  option = Object.assign({
    immediate: true, // 是否立即下载
    fileName: ''
  }, option || {})

  return option
}

const docxload = async function(template, option) {
  option = getExportOption(option)
  const { immediate, fileName } = option

  const complier = new Complier(template)
  const blob = await complier.compile()
  const packer = new Export(blob)

  return packer.export(fileName, immediate)
}

export default docxload
