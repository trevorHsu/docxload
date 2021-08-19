const exportWord = function(blob, title) {
  const createA = document.createElement('a')
  const href = window.URL.createObjectURL(blob)

  createA.href = href
  createA.download = `${title || 'data'}.docx`

  document.body.appendChild(createA)
  createA.click()
  document.body.removeChild(createA)
  window.URL.revokeObjectURL(href)
}

export default exportWord
