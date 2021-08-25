const getFileName = function(fileName) {
  const extensionReg = /.+\.(.)+/

  if (!fileName) {
    fileName = 'data.docx'
  } else if (!extensionReg.test(fileName)) {
    fileName = `${fileName}.docx`
  }

  return fileName
}

const exportFile = function(blob, fileName) {
  const createA = document.createElement('a')
  const href = window.URL.createObjectURL(blob)

  createA.href = href
  createA.download = getFileName(fileName)

  document.body.appendChild(createA)
  createA.click()
  document.body.removeChild(createA)
  window.URL.revokeObjectURL(href)
}

export default exportFile
