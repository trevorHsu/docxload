import { TextRun } from 'docx'
import { getAttrs, addAttrs } from './common'

function text(conf) {
  const { bold, color, fontSize } = getAttrs(conf)
  const textConf = {
    text: conf.value || ''
  }

  if (fontSize) {
    textConf.size = Number(fontSize) || 20
  }

  addAttrs(textConf, { bold, color })

  return new TextRun(textConf)
}

export default text
