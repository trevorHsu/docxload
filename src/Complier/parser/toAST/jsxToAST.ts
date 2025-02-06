// Traverse the JSX VNode to generate a syntax tree that meets the requirements of the docxload format.
import { toCamelCase } from '@src/utils/string'
import { parseSubAttrs } from './parseAttrs'
import { type VNodeType, type ASTNodeType } from '@src/Complier/types'

function parseAttrs(attrs: Record<string, any>) {
  const result = {}

  if (!attrs) {
    return result
  }

  Object.entries(attrs).forEach(([key, value]) => {
    result[toCamelCase(key)] = parseSubAttrs(value)
  })

  return result
}

function parseVNode(VNode: VNodeType) {
  let result: ASTNodeType

  if (VNode.tag) {
    result = {
      tag: VNode.tag,
      attrs: parseAttrs(VNode.data && VNode.data.attrs), 
      children: null
    }
    if (VNode.children && VNode.children.length) {
      result.children = VNode.children.map(child => parseVNode(child))
    }
  } else {
    result = { text: VNode.text }
  }

  return result
}

function jsxToAST (VNode: VNodeType) {
  const result = parseVNode(VNode)
  return [result]
}

export default jsxToAST
