import { COMPONENT_TYPES, type CommonConfType } from '@src/Complier/types'
import { PCT_REG } from './variables'
import { getAttrs, addConfAttrs } from '../common'

function getDefaultCellWidth(cellList: CommonConfType[], occupiedWidth?: number | null) {
  // Calculate the total number of cells in the row and subtract the width that has already been set
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

function getRowSpanInfo(rows: CommonConfType[]) { // handle the information of merged rows: { [row index where merging occurs (excluding the starting row)]: [initial coordinates of the merged cells] }
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

function getCellWidthNum(cell: CommonConfType) {
  const attrs = getAttrs(cell)
  let { width } = attrs

  width = Number(PCT_REG.exec(width)[1])

  return width
}

function getAverageColumnWidths(rows: CommonConfType[]) { // The default value of column width. If this value is not specified, the table width in WPS may sometimes not match the expected result.
  const result = []

  if (rows && rows[0]) { // Based on the first row.
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

function getTableRows(tableConf: CommonConfType) {
  const rowList = tableConf.children
    ? tableConf.children.filter(item => item.type === COMPONENT_TYPES.ROW)
    : []

  return rowList
}

function getRowCells(rowConf: CommonConfType): CommonConfType[] {
  const cellList = rowConf.children
    ? rowConf.children.filter((item: CommonConfType) => item.type === COMPONENT_TYPES.CELL)
    : []

  return cellList
}

function fixTableConf(rowsConf: CommonConfType[], { tableWidth }) { // width, colspan, rowspan, verticalAlign
  const rowSpanInfo = getRowSpanInfo(rowsConf)

  rowsConf.forEach((row, rowIndex) => {
    const attrs = getAttrs(row)
    const cellList = getRowCells(row)

    attrs._tableWidth = tableWidth

    // Determine if the current row contains any merged rows. If so, calculate the sum of the widths of the cells in the merged rows and use this sum as the placeholder width.
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
