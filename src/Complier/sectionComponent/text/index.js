import { TextRun } from 'docx'
import { getAttrs, addAttrs, processAttrs } from '../common'
import attrsHandler from './text-attrs'

function text(conf) {
  const attrs = getAttrs(conf)
  const textContent = conf.value
  const textConf = {}

  if (textContent instanceof Array) {
    textConf.children = textContent
  } else {
    textConf.text = textContent || ''
  }

  processAttrs(attrs, attrsHandler)
  addAttrs(textConf, attrs, false)

  return new TextRun(textConf)
}

export default text
