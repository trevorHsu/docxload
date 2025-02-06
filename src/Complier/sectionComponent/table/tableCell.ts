import {
  Paragraph, TableCell, AlignmentType
} from 'docx'
import { generateComponents } from '@src/Complier/generator/index'
import { getAttrs, addAttrs, processAttrs } from '../common'
import attrsHandler from './tableCell-attrs'
import { type CommonConfType } from '@src/Complier/types'

function tableCell(conf: CommonConfType) {
  const attrs = getAttrs(conf)
  const { align, fontSize } = attrs
  
  const children = (conf.children || []).map((item: CommonConfType) => {
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
