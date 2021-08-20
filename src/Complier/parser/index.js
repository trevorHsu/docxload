import { pipe } from '@src/utils/functional'
import toAST from './toAST'
import toComponentConf from './toComponentConf'

const toConf = async function(ast) {
  const rootTag = Symbol('root')
  return (await toComponentConf({ tag: rootTag, children: ast || [] }, rootTag)).children
}

// 解析模板语法，生成json配置
const parseTemplate = async function(template) {
  return await pipe(toAST, toConf)(template)
}

export default parseTemplate
