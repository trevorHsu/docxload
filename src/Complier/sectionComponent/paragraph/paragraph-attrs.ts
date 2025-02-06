import { HeadingLevel } from 'docx'
import spacingDataHandler from './spacingDataHandler'
import { type SpacingDataType, type DocxAttrsType, type AttrsProcessorType } from '../../types'

function heading(val: string | null, attrs: DocxAttrsType) { // title level
  if (!val) {
    return
  }

  attrs.heading = HeadingLevel[val.toUpperCase()]
}

function indent(val: number | string | null, attrs: DocxAttrsType) { // set indent
  if (!val) {
    return
  }

  const oneTab = 500
  val = Math.abs(Number(val))

  if (val) {
    attrs.indent = { left: val * oneTab }
  }
}

function spacing(val: SpacingDataType | null, attrs: DocxAttrsType) { // interval of paragraphs，has four sub attributes：before after line lineRule
  if (!val) {
    return
  }

  let result = {}
  let spacing = spacingDataHandler(val)

  Object.entries(spacing).forEach(([key, value]) => {
    if (value) {
      result[key] = value
    }
  })

  attrs.spacing = result
}

export default { heading, indent, spacing } as AttrsProcessorType
