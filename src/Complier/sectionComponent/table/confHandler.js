import { COMPONENT_TYPES } from '@src/Complier/types'
import { PCT_REG } from './variables'
import { getAttrs, addConfAttrs } from '../common'

function getDefaultCellWidth(cellList, occupiedWidth) {
  // 计算该行单元格总数  减去已经设好的宽度
  occupiedWidth = occupiedWidth || 0
  let cellCount = 0
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
    if (width && PCT_REG.test(width)) {
      width = Number(PCT_REG.exec(width)[1])
      occupiedWidth += width
      cellCount -= countDelta

      width = `${width}%`
    }

    cell.attrs && Object.assign(cell.attrs, { columnSpan, rowSpan, width })
  })

  if (occupiedWidth < 100) {
    defaultCellWidth = Math.round((100 - occupiedWidth) / cellCount * 1000) / 1000
  }

  return defaultCellWidth
}

function getRowSpanInfo(rows) { // 统计合并行的信息 { [存在合并行的行下标(不包含起始行)]: [ 合并行的单元格的初始坐标 ] }
  const result = {}

  rows.forEach((row, rowIndex) => {
    getRowCells(row).forEach((cell, cellIndex) => {
      let { rowspan } = getAttrs(cell)
      rowspan = rowspan ? Number(rowspan) : 1

      if (rowspan <= 1) {
        return
      }

      const cellCoordinate = [rowIndex, cellIndex]

      for (let i = rowIndex + 1; i < rowIndex + rowspan; i++) {
        if (result[i]) {
          result[i].push(cellCoordinate)
        } else {
          result[i] = [cellCoordinate]
        }
      }
    })
  })

  return result
}

function getCellWidthNum(cell) {
  const attrs = getAttrs(cell)
  let { width } = attrs

  width = Number(PCT_REG.exec(width)[1])

  return width
}

function getAverageColumnWidths(rows) { // 列宽的默认值  若没有该值，在WPS中的表格宽度有时会与预期不符
  const result = []

  if (rows && rows[0]) { // 以第一行为基准
    const { _tableWidth } = getAttrs(rows[0])
    let cellCount = 0

    getRowCells(rows[0]).forEach(cell => {
      const { columnSpan } = getAttrs(cell)
      cellCount += (columnSpan || 1)
    })

    const averageColumnWidth = _tableWidth / cellCount

    for (let i = 0; i < cellCount; i++) {
      result.push(averageColumnWidth)
    }
  }

  return result
}

function getTableRows(tableConf) {
  const rowList = tableConf.children
    ? tableConf.children.filter(item => item.type === COMPONENT_TYPES.ROW)
    : []

  return rowList
}

function getRowCells(rowConf) {
  const cellList = rowConf.children
    ? rowConf.children.filter(item => item.type === COMPONENT_TYPES.CELL)
    : []

  return cellList
}

function fixTableConf(rowsConf, { tableWidth }) { // width, colspan, rowspan, verticalAlign
  const rowSpanInfo = getRowSpanInfo(rowsConf)

  rowsConf.forEach((row, rowIndex) => {
    const attrs = getAttrs(row)
    const cellList = getRowCells(row)

    attrs._tableWidth = tableWidth

    // 判断本行是否有被合并行  若有  计算合并行的单元格的宽度之和  作为占位宽度
    const occupiedWidth = rowSpanInfo[rowIndex]
      ? rowSpanInfo[rowIndex].reduce((total, cellPosition) => {
        total += getCellWidthNum(rowsConf[cellPosition[0]].children[cellPosition[1]])
        return total
      }, 0)
      : 0

    const defaultCellWidth = getDefaultCellWidth(cellList, occupiedWidth)

    cellList.forEach(cell => {
      const { columnSpan } = getAttrs(cell)

      addConfAttrs(cell, {
        _tableWidth: tableWidth,
        width: `${defaultCellWidth * (columnSpan || 1)}%`,
        verticalAlign: attrs.verticalAlign
      }, false)
    })
  })
}

export {  
  getAverageColumnWidths, getTableRows, getRowCells, 
  fixTableConf 
}
