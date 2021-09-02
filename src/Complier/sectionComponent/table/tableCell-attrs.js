import {
  VerticalAlign, WidthType, BorderStyle
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

function getBorderConf(val, directions) {
  if (typeof val !== 'object') {
    return
  }

  let result = {}
  let { style, size, color } = val
  style = (style && BorderStyle[style.toUpperCase()]) || BorderStyle.SINGLE
  size = (size && Number(size)) || 6

  if (!(directions instanceof Array)) {
    directions = [directions] 
  }

  let borderConf = { style, size, color }

  directions.forEach(direction => {
    result[direction] = borderConf
  })

  return result
}

function border(val, attrs) {
  let conf = getBorderConf(val, [ 'top', 'right', 'bottom', 'left' ])
  if (!conf) return

  // border 属性的优先级低于border-[direction]属性，可以被border-[direction]覆盖
  attrs.borders = Object.assign(conf, attrs.borders || {})
}

function borderTop(val, attrs) {
  let conf = getBorderConf(val, 'top')
  if (!conf) return

  attrs.borders = Object.assign(attrs.borders || {}, conf)
}

function borderLeft(val, attrs) {
  let conf = getBorderConf(val, 'left')
  if (!conf) return

  attrs.borders = Object.assign(attrs.borders || {}, conf)
}

function borderRight(val, attrs) {
  let conf = getBorderConf(val, 'right')
  if (!conf) return

  attrs.borders = Object.assign(attrs.borders || {}, conf)
}

function borderBottom(val, attrs) {
  let conf = getBorderConf(val, 'bottom')
  if (!conf) return

  attrs.borders = Object.assign(attrs.borders || {}, conf)
}

export default { verticalAlign, width, border, borderTop, borderLeft, borderRight, borderBottom }
