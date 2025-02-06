import { COMPONENT_TYPES } from '../types'
import { combineComponents } from '../sectionComponent/index'
import generateComponents from './generateComponents'
import addAdditionalAttrs from './addAdditionalAttrs'
import { type CommonConfType } from '@src/Complier/types'

const { SECTION } = COMPONENT_TYPES

const generateDoc = function(conf:CommonConfType[] = []) {
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
