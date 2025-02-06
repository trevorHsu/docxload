import { WidthType } from 'docx'
import { PAGE_WIDTH, PAGE_WIDTH_HORIZONTAL, PCT_REG } from './variables'
import { PAGE_ORIENTATION } from '../section/variables'
import { type DocxAttrsType, type AttrsProcessorType, } from '@src/Complier/types'

// In Word 2007, width configuration cannot use percentages, so the width is set using the dxa type.
function width(val: string, attrs: DocxAttrsType) {
  const pageWidth = (attrs._pageOrientation_ && attrs._pageOrientation_ === PAGE_ORIENTATION.horizontal)
    ? PAGE_WIDTH_HORIZONTAL
    : PAGE_WIDTH
  const widthPercentage = PCT_REG.test(val) ? Number(PCT_REG.exec(val)[1]) : 100
  const tableWidth = widthPercentage / 100 * pageWidth

  attrs.width = {
    size: tableWidth,
    type: WidthType.DXA
  }
}

export default { width } as AttrsProcessorType
