import { generateComponents } from '@src/Complier/generator'
import { getAttrs, addAttrs, processAttrs } from '../common'
import attrsHandler from './section-attrs'


function section(conf) {
  const attrs = getAttrs(conf)
  const sectionConf = {
    children: generateComponents(conf.children)
  }

  processAttrs(attrs, attrsHandler)
  addAttrs(sectionConf, attrs, false)

  return sectionConf
}

export default section
