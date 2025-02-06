import {
  VerticalAlign, WidthType, BorderStyle
} from 'docx'
import { PCT_REG } from './variables'
import { type DocxAttrsType, type AttrsProcessorType, type TableBorderConfType } from '@src/Complier/types'

function verticalAlign(val: string | null | undefined, attrs: DocxAttrsType) {
  attrs.verticalAlign = (val && VerticalAlign[val.toUpperCase()]) || VerticalAlign.CENTER
}

function width(val: string | null | undefined, attrs: DocxAttrsType) {
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

function getBorderConf(val: TableBorderConfType, directions: string[] | string) {
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

function border(val: TableBorderConfType, attrs: DocxAttrsType) {
  let conf = getBorderConf(val, [ 'top', 'right', 'bottom', 'left' ])
  if (!conf) return

  // The priority of the border property is lower than that of the border-[direction] properties and can be overridden by them.
  attrs.borders = Object.assign(conf, attrs.borders || {})
}

function borderTop(val: TableBorderConfType, attrs: DocxAttrsType) {
  let conf = getBorderConf(val, 'top')
  if (!conf) return

  attrs.borders = Object.assign(attrs.borders || {}, conf)
}

function borderLeft(val: TableBorderConfType, attrs: DocxAttrsType) {
  let conf = getBorderConf(val, 'left')
  if (!conf) return

  attrs.borders = Object.assign(attrs.borders || {}, conf)
}

function borderRight(val: TableBorderConfType, attrs: DocxAttrsType) {
  let conf = getBorderConf(val, 'right')
  if (!conf) return

  attrs.borders = Object.assign(attrs.borders || {}, conf)
}

function borderBottom(val: TableBorderConfType, attrs: DocxAttrsType) {
  let conf = getBorderConf(val, 'bottom')
  if (!conf) return

  attrs.borders = Object.assign(attrs.borders || {}, conf)
}

export default { verticalAlign, width, border, borderTop, borderLeft, borderRight, borderBottom } as AttrsProcessorType
