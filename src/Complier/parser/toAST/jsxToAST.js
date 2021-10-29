// vue将jsx转成了VNode，本程序对VNode进行遍历，从而生成满足docxload格式要求的语法树
import { toCamelCase } from '@src/utils/string'
import { parseSubAttrs } from './parseAttrs'

function parseAttrs(attrs) {
  const result = {}

  if (!attrs) {
    return result
  }

  Object.entries(attrs).forEach(([key, value]) => {
    result[toCamelCase(key)] = parseSubAttrs(value)
  })

  return result
}

function parseVNode(VNode) {
  let result

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

function jsxToAST (VNode) {
  const result = parseVNode(VNode)
  return [result]
}

export default jsxToAST
