import jsxToAST from './jsxToAST'
import strToAST from './strToAST'

function toAST(template) {
  if (typeof template === 'object') {
    return jsxToAST(template)
  }
  if (typeof template === 'string') {
    return strToAST(template)
  }
}

export default toAST
