import { Paragraph, HeadingLevel, AlignmentType } from 'docx'
import { generateComponents } from '../generator/index'
import { type CommonConfType } from '../types'

function title(conf: CommonConfType) {
  const children = (conf.children || []).map((item: any) => {
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
