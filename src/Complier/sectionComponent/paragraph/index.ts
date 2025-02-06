import { Paragraph } from 'docx'
import { generateComponents } from '@src/Complier/generator/index'
import { getAttrs, addAttrs, processAttrs } from '../common'
import attrsHandler from './paragraph-attrs'
import { type CommonConfType } from '../../types'


function paragraph(conf: CommonConfType) {
  const attrs = getAttrs(conf)
  const paragraphConf = {
    children: generateComponents(conf.children)
  }

  processAttrs(attrs, attrsHandler)
  addAttrs(paragraphConf, attrs, false)

  return new Paragraph(paragraphConf)
}

export default paragraph
