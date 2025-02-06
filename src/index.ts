import Complier from './Complier/index'
import Export from './Export/index'

type exportObjectOption = {
  immediate?: boolean
  fileName?: string
}

type exportOption = exportObjectOption | string

const getExportOption = function(option?: exportOption) {
  if (typeof option === 'string') {
    option = { fileName: option }
  }

  option = Object.assign({
    immediate: true, // execute download immediately
    fileName: ''
  }, option || {})

  return option
}

const docxload = async function(template: string, option?: exportOption) {
  option = getExportOption(option)
  const { immediate, fileName } = option

  const complier = new Complier(template)
  const blob = await complier.compile()
  const packer = new Export(blob)

  return packer.export(fileName, immediate)
}

export default docxload
