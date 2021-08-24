import { Paragraph } from 'docx'
import { generateComponents } from '../generator'
import { getAttrs, addAttrs } from './common'

function paragraph(conf) {
  const attrs = getAttrs(conf)
  const paragraphConf = {
    children: generateComponents(conf.children)
  }

  addAttrs(paragraphConf, attrs, false)

  return new Paragraph(paragraphConf)
}

export default paragraph
