import { TextRun } from 'docx'
import { getAttrs, addAttrs, processAttrs } from '../common'
import attrsHandler from './text-attrs'
import { type DocxAttrsType, type CommonConfType } from '../../types'

function text(conf: CommonConfType) {
  const attrs = getAttrs(conf)
  const textContent = conf.value
  const textConf = {} as DocxAttrsType

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
