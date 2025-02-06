import { TableRow } from 'docx'
import { generateComponents } from '@src/Complier/generator/index'
import { getAttrs, addAttrs, processAttrs } from '../common'
import { getRowCells } from './confHandler'
import attrsHandler from './tableRow-attrs'
import { type CommonConfType } from '@src/Complier/types'

function tableRow(conf: CommonConfType) {
  const attrs = getAttrs(conf)
  const cellsConf = getRowCells(conf)
  const rowConf = {
    children: generateComponents(cellsConf)
  }

  processAttrs(attrs, attrsHandler)
  addAttrs(rowConf, attrs, false)

  return new TableRow(rowConf)
}

export default tableRow
