import { LineRuleType } from 'docx'


function poundToNumber(number) { // 磅 -> 数值 
  number = Number(number)
  let result = isNaN(number) ? 0 : number * 20
  
  return result
}

function timesToNumber(number) { // 倍数 -> 数值
  number = Number(number)
  let result = isNaN(number) ? 0 : number * 240

  return result
}

function spacingDataHandler(conf) {
  let { before, after, lineRule, line } = conf

  before = poundToNumber(before)
  after = poundToNumber(after)

  switch (lineRule) {
    case 'multiple': // 多倍行距
      line = timesToNumber(line)
      lineRule = LineRuleType.AUTO
      break
    case 'atLeast': // 最小行距
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
