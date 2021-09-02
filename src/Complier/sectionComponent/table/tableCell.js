import {
  Paragraph, TableCell, AlignmentType
} from 'docx'
import { generateComponents } from '@src/Complier/generator'
import { getAttrs, addAttrs, processAttrs } from '../common'
import attrsHandler from './tableCell-attrs'

function tableCell(conf) {
  const attrs = getAttrs(conf)
  const { align, fontSize } = attrs
  
  const children = (conf.children || []).map(item => {
    if (fontSize && !item.fontSize) {
      item.attrs && Object.assign(item.attrs, { fontSize })
    }

    return item
  })

  const cellConf = {
    children: [new Paragraph({
      alignment: (align && AlignmentType[align.toUpperCase()]) || AlignmentType.CENTER,
      children: generateComponents(children)
    })]
  }

  processAttrs(attrs, attrsHandler)
  addAttrs(cellConf, attrs, false)

  return new TableCell(cellConf)
}

export default tableCell
