import parseTemplate from './parser'
import generateDoc, { toBlob } from './generator'

const compile = async function(template: string) {
  const parsedData = await parseTemplate(template)
  const doc = generateDoc(parsedData)

  return toBlob(doc)
}

export default compile
