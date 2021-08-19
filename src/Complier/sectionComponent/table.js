import {
  Paragraph, Table, TableCell, TableRow,
  VerticalAlign, WidthType, HeightRule, AlignmentType
} from 'docx'
import { COMPONENT_TYPES } from '../types'
import { getAttrs, addConfAttrs, addAttrs } from './common'
import { generateComponents } from '../generator'

const TABLE_CELL_CONF_HANDLER = {
  getDefaultCellWidth(cellList) {
    const cellWidthReg = /^([0-9]*[1-9][0-9]*)(%+$)?/

    // 计算该行单元格总数  减去已经设好的宽度
    let cellCount = 0
    let occupiedWidth = 0 // 0 - 100
    let defaultCellWidth = 0

    cellList.forEach(cell => {
      const attrs = getAttrs(cell)
      const { colspan, rowspan } = attrs
      let { columnSpan, rowSpan, width } = attrs

      // colspan rowspan
      colspan && !columnSpan && (columnSpan = colspan)
      rowspan && !rowSpan && (rowSpan = rowspan)

      columnSpan && (columnSpan = Number(columnSpan))
      rowSpan && (rowSpan = Number(rowSpan))

      const countDelta = columnSpan || 1

      cellCount += countDelta

      // width
      if (width && cellWidthReg.test(width)) {
        width = cellWidthReg.exec(width)[1]
        occupiedWidth += width
        cellCount -= countDelta

        width = `${width}%`
      }

      cell.attrs && Object.assign(cell.attrs, { columnSpan, rowSpan, width })
    })

    if (occupiedWidth < 100) {
      defaultCellWidth = (100 - occupiedWidth) / cellCount
    }

    return defaultCellWidth
  }
}

function fixTableCellsConf(rowsConf) { // width, colspan, rowspan, verticalAlign
  rowsConf.forEach(row => {
    const attrs = getAttrs(row)
    const cellList = row.children
      ? row.children.filter(item => item.type === COMPONENT_TYPES.CELL)
      : []
    const defaultCellWidth = TABLE_CELL_CONF_HANDLER.getDefaultCellWidth(cellList)
    const defaultCellWidthStr = `${defaultCellWidth}%`

    cellList.forEach(cell => {
      addConfAttrs(cell, {
        width: defaultCellWidthStr,
        verticalAlign: attrs.verticalAlign
      }, false)
    })
  })
}

// components

function table(conf) {
  const { width } = getAttrs(conf)
  const rowsConf = conf.children
    .filter(item => item.type === COMPONENT_TYPES.ROW)

  fixTableCellsConf(rowsConf)

  const tableConf = {
    width: {
      size: width || '100%',
      type: WidthType.PCT
    },
    rows: generateComponents(rowsConf)
  }

  return new Table(tableConf)
}

function tableRow(conf) {
  const { height } = getAttrs(conf)
  const cellsConf = conf.children
    ? conf.children.filter(item => item.type === COMPONENT_TYPES.CELL)
    : []
  const rowConf = {
    height: {
      value: height || '1cm',
      rule: HeightRule.ATLEAST
    },
    children: generateComponents(cellsConf)
  }

  return new TableRow(rowConf)
}

function tableCell(conf) {
  const { width, columnSpan, rowSpan, align, verticalAlign, fontSize } = getAttrs(conf)
  const children = (conf.children || []).map(item => {
    if (fontSize && !item.fontSize) {
      item.attrs && Object.assign(item.attrs, { fontSize })
    }

    return item
  })

  const cellConf = {
    verticalAlign: (verticalAlign && VerticalAlign[verticalAlign.toUpperCase()]) || VerticalAlign.CENTER,
    children: [new Paragraph({
      alignment: (align && AlignmentType[align.toUpperCase()]) || AlignmentType.CENTER,
      children: generateComponents(children)
    })],
    width: width
      ? {
        size: width,
        type: WidthType.PERCENTAGE
      }
      : {
        type: WidthType.AUTO
      }
  }

  addAttrs(cellConf, { columnSpan, rowSpan })

  return new TableCell(cellConf)
}

export { table, tableRow, tableCell }
