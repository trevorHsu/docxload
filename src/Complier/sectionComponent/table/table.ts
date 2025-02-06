import { Table } from 'docx'
import { generateComponents } from '@src/Complier/generator/index'
import { getAttrs, addAttrs, processAttrs } from '../common'
import { getAverageColumnWidths, fixTableConf, getTableRows } from './confHandler'
import attrsHandler from './table-attrs'
import { type CommonConfType, } from '@src/Complier/types'

function table(conf: CommonConfType) {
  const attrs = getAttrs(conf)  
  const rowsList = getTableRows(conf)

  processAttrs(attrs, attrsHandler)
  fixTableConf(rowsList, { tableWidth: attrs.width.size })

  const tableConf = {
    rows: generateComponents(rowsList),
    columnWidths: getAverageColumnWidths(rowsList)
  }

  addAttrs(tableConf, attrs, false)

  return new Table(tableConf)
}

export default table
