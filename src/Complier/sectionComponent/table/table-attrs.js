import { WidthType } from 'docx'
import { PAGE_WIDTH, PAGE_WIDTH_HORIZONTAL, PCT_REG } from './variables'
import { PAGE_ORIENTATION } from '../section/variables'

// word 2007 宽度配置无法使用百分比，因此用dxa类型来设置宽度
function width(val, attrs) {
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

export default { width }
