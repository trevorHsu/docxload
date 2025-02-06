import { pipe } from '@src/utils/functional'
import toAST from './toAST/index'
import toComponentConf from './toComponentConf'
import { type ASTNodeType, type VNodeType } from '@src/Complier/types'

const toConf = async function(ast: ASTNodeType[]) {
  const rootTag = Symbol('root')
  return (await toComponentConf({ tag: rootTag, children: ast || [] }, rootTag)).children
}

// Parse the template syntax to generate a JSON configuration.
const parseTemplate = async function(template: string | VNodeType) {
  return await pipe(toAST, toConf)(template)
}

export default parseTemplate
