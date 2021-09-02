
import { WidthType } from 'docx'
import { PAGE_WIDTH, PCT_REG } from './variables'

// word 2007 宽度配置无法使用百分比，因此用dxa类型来设置宽度
function width(val, attrs) {
  const widthPercentage = PCT_REG.test(val) ? Number(PCT_REG.exec(val)[1]) : 100
  const tableWidth = widthPercentage / 100 * PAGE_WIDTH

  attrs.width = {
    size: tableWidth,
    type: WidthType.DXA
  }
}

export default { width }
