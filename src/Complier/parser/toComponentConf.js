import { syncMap } from '@src/libs/functional'
import { COMPONENT_TYPES } from '../types'

const { SECTION, TITLE, TABLE, PARAGRAPH, TEXT, ROW, CELL, IMAGE, BREAK } = COMPONENT_TYPES
const TAG_MAP = {
  page: SECTION,
  title: TITLE,
  p: PARAGRAPH,
  table: TABLE,
  row: ROW,
  cell: CELL,
  span: TEXT,
  img: IMAGE,
  br: BREAK
}

async function componentConfFactory(tagData) {
  let result = {
    type: TAG_MAP[tagData.tag],
    children: (await syncMap(tagData.children, item => toComponentConf(item))).filter(item => item),

    attrs: tagData.attrs
  }

  switch (TAG_MAP[tagData.tag]) {
    case IMAGE: // 无图片资源时，去掉该配置
      if (!tagData.attrs || !tagData.attrs.src) {
        result = null
      }
      break
    case TEXT:
      delete result.children

      result.value = tagData.children && tagData.children[0] ? tagData.children[0].text : ''
      break
  }

  return result
}

async function toComponentConf(tagData, rootTag) {
  if (typeof rootTag !== 'undefined' && tagData.tag === rootTag) {
    return {
      type: rootTag,
      children: (await syncMap(tagData.children, item => toComponentConf(item))).filter(item => item)
    }
  } else if (TAG_MAP[tagData.tag]) {
    return componentConfFactory(tagData)
  } else if (typeof tagData.text !== 'undefined') {
    return {
      type: TEXT,
      value: tagData.text,
      attrs: {}
    }
  }
}

export default toComponentConf
