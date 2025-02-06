import { LineRuleType } from 'docx'
import { type SpacingDataType } from '../../types'


function poundToNumber(num: number|string) { // pound -> number 
  num = Number(num)
  let result = isNaN(num) ? 0 : num * 20
  
  return result
}

function timesToNumber(num: number|string) { // times -> number
  num = Number(num)
  let result = isNaN(num) ? 0 : num * 240

  return result
}

function spacingDataHandler(conf: SpacingDataType): SpacingDataType {
  let { before, after, lineRule, line } = conf

  before = poundToNumber(before)
  after = poundToNumber(after)

  switch (lineRule) {
    case 'multiple':
      line = timesToNumber(line)
      lineRule = LineRuleType.AUTO
      break
    case 'atLeast':
      line = poundToNumber(line)
      lineRule = LineRuleType.AT_LEAST 
      break
    default:
      line = 0
      lineRule = ''
  }

  let result = { before, after, lineRule, line }

  return result
}

export default spacingDataHandler
