import { COMPONENT_TYPES } from '../types'
import {
  text, title, table, tableRow, tableCell, paragraph, image, breakLine, section,
} from '../sectionComponent'

const { SECTION, TITLE, TABLE, PARAGRAPH, TEXT, ROW, CELL, IMAGE, BREAK } = COMPONENT_TYPES

const COMPONENT_GENERATOR = {
  [SECTION]: section,
  [TEXT]: text,
  [TITLE]: title,
  [PARAGRAPH]: paragraph,
  [TABLE]: table,
  [ROW]: tableRow,
  [CELL]: tableCell,
  [IMAGE]: image,
  [BREAK]: breakLine
}

const generateComponents = function(conf) {
  const components = []

  conf && conf.forEach(confItem => {
    const component = (confItem && confItem.type && COMPONENT_GENERATOR[confItem.type])
      ? COMPONENT_GENERATOR[confItem.type](confItem)
      : null

    // todo: warn no such type

    component && components.push(component)
  })

  return components
}

export default generateComponents
