import { Paragraph, HeadingLevel, AlignmentType } from 'docx'
import { generateComponents } from '../generator'

function title(conf) {
  const children = (conf.children || []).map(item => {
    const defaultAttrs = {
      bold: true,
      color: '000000'
    }

    item.attrs = item.attrs || {}
    Object.assign(defaultAttrs, item.attrs)
    Object.assign(item.attrs, defaultAttrs)

    return item
  })

  return new Paragraph({
    children: generateComponents(children),
    heading: HeadingLevel.HEADING_1,
    alignment: AlignmentType.CENTER
  })
}

export default title
