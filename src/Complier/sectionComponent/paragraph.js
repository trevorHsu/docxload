import { Paragraph } from 'docx'
import { generateComponents } from '../generator'

function paragraph(conf) {
  return new Paragraph({
    children: generateComponents(conf.children)
  })
}

export default paragraph
