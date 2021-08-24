import { TextRun } from 'docx'
import { getAttrs, addAttrs } from './common'

function text(conf) {
  const attrs = getAttrs(conf)
  const { fontSize } = attrs
  const textConf = {
    text: conf.value || ''
  }

  if (fontSize) {
    textConf.size = Number(fontSize) || 20
  }

  addAttrs(textConf, attrs, false)

  return new TextRun(textConf)
}

export default text
