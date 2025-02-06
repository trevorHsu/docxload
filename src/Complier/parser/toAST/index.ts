import jsxToAST from './jsxToAST'
import strToAST from './strToAST'
import { type VNodeType } from '@src/Complier/types'

function toAST(template: string | VNodeType) {
  if (typeof template === 'object') {
    return jsxToAST(template)
  }
  if (typeof template === 'string') {
    return strToAST(template)
  }
}

export default toAST
