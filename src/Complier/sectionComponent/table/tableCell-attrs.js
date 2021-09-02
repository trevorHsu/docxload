import {
  VerticalAlign, WidthType
} from 'docx'
import { PCT_REG } from './variables'

function verticalAlign(val, attrs) {
  attrs.verticalAlign = (val && VerticalAlign[val.toUpperCase()]) || VerticalAlign.CENTER
}

function width(val, attrs) {
  const { _tableWidth } = attrs
  const widthPercentage = PCT_REG.test(val) ? Number(PCT_REG.exec(val)[1]) : 0

  attrs.width = val
    ? {
      size: widthPercentage / 100 * _tableWidth,
      type: WidthType.DXA
    }
    : {
      type: WidthType.AUTO
    }
}

export default { verticalAlign, width }
