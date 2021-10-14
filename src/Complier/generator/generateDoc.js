import { COMPONENT_TYPES } from '../types'
import { combineComponents } from '../sectionComponent'
import generateComponents from './generateComponents'
import addAdditionalAttrs from './addAdditionalAttrs'

const { SECTION } = COMPONENT_TYPES

// 通过json配置生成doc实例
const generateDoc = function(conf = []) {
  const setcionsConf = conf
    .filter(item => item && item.type === SECTION)
    .map(item => addAdditionalAttrs(item))

  const sections = generateComponents(
    setcionsConf
  ).filter(item => item)

  const doc = combineComponents(...sections)

  return doc
}

export default generateDoc
