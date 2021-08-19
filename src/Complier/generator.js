import { COMPONENT_TYPES } from './types'
import {
  text, title, table, tableRow, tableCell, paragraph, image, breakLine, section,
  combineComponents
} from './sectionComponent'
import { Packer } from 'docx'

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

// 通过json配置生成doc实例
const generateDoc = function(conf = []) {
  const sections = generateComponents(
    conf.filter(item => item && item.type === SECTION)
  ).filter(item => item)
  const doc = combineComponents(...sections)

  return doc
}

// 生成blob
const toBlob = function(doc) {
  return Packer.toBlob(doc)
}

export default generateDoc
export { toBlob, generateComponents }
