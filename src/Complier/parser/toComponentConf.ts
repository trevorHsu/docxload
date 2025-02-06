import { syncMap, flatArray } from '@src/utils/functional'
import { imgSrcToBase64 } from '@src/utils/parse'
import { COMPONENT_TYPES, type ASTNodeType, } from '../types'

const { SECTION, TITLE, TABLE, PARAGRAPH, TEXT, ROW, CELL, IMAGE, BREAK, TEMPLATE } = COMPONENT_TYPES
const TAG_MAP = {
  page: SECTION,
  title: TITLE,
  p: PARAGRAPH,
  table: TABLE,
  row: ROW,
  cell: CELL,
  span: TEXT,
  img: IMAGE,
  br: BREAK,
  template: TEMPLATE,
}

async function componentConfFactory(tagData: ASTNodeType) {
  let result = {
    type: TAG_MAP[tagData.tag],
    children: (await syncMap(tagData.children, item => toComponentConf(item))).filter(item => item),
    attrs: tagData.attrs,
    value: undefined
  }

  switch (TAG_MAP[tagData.tag]) {
    case IMAGE:
      if (!tagData.attrs || !tagData.attrs.src) { // Remove the configuration when there are no image resources.
        result = null
      } else if (tagData.attrs.src) {
        tagData.attrs.src = await imgSrcToBase64(tagData.attrs.src)
      }
      break
    case TEXT:
      delete result.children

      result.value = tagData.children && tagData.children[0] ? tagData.children[0].text : ''
      break
  }

  return result
}

async function toComponentConf(tagData: ASTNodeType, rootTag?: ASTNodeType['tag']) {
  let result = null

  if (typeof rootTag !== 'undefined' && tagData.tag === rootTag) {
    result = {
      type: rootTag,
      children: (await syncMap(tagData.children, (item: ASTNodeType) => toComponentConf(item))).filter(item => item)
    }
  } else if (TAG_MAP[tagData.tag] === TEMPLATE) { // If it is a template, return the result in the form of an array, which is equivalent to ignoring the template.
    result = (await syncMap(tagData.children, (item: ASTNodeType) => toComponentConf(item))).filter(item => item)
  } else if (TAG_MAP[tagData.tag]) {
    result = await componentConfFactory(tagData)
  } else if (typeof tagData.text !== 'undefined') {
    result = {
      type: TEXT,
      value: tagData.text,
      attrs: {}
    }
  }

  if (
    Object.prototype.toString.call(result) === '[object Object]' 
    && result.children
  ) { // Expand the elements in children that are of array type.
    result.children = flatArray(result.children)
  }

  return result
}

export default toComponentConf
