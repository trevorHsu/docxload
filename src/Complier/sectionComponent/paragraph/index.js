import { Paragraph } from 'docx'
import { generateComponents } from '@src/Complier/generator'
import { getAttrs, addAttrs, processAttrs } from '../common'
import attrsHandler from './paragraph-attrs'


function paragraph(conf) {
  const attrs = getAttrs(conf)
  const paragraphConf = {
    children: generateComponents(conf.children)
  }

  processAttrs(attrs, attrsHandler)
  addAttrs(paragraphConf, attrs, false)

  return new Paragraph(paragraphConf)
}

export default paragraph
