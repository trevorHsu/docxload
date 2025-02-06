import { toCamelCase } from '@src/utils/string'
import { BASE64_PATTERN } from '@src/utils/parse'

function addSubAttr(str: string, splitIndex: number, result: Record<string, string>) {
  let key = str.substring(0, splitIndex).trim()
  let value = str.substring(splitIndex + 1).trim()
  if (key && value) result[toCamelCase(key)] = value
}

// Convert the string format "key1: value1; key2: value2" into an object { key1: value1, key2: value2 }.
function parseSubAttrs(data: string | Record<string, any>) {
  let result = data

  if (
    data 
    && typeof data === 'string' 
    && data.indexOf(';') !== -1 
    && !BASE64_PATTERN.test(data)
  ) {
    let strLen = data.length
    let curStr = ''
    let scanner = 0
    let colonIndex = -1

    result = {}

    while (scanner < strLen) {
      let curChar = data[scanner]

      if (curChar === ';') {
        (colonIndex !== -1) && addSubAttr(curStr, colonIndex, result)
        colonIndex = -1
        curStr = ''
      } else if (curChar === ':') {
        if (colonIndex !== -1) curStr = curStr.substring(colonIndex + 1)
        colonIndex = curStr.length
        curStr += curChar
      } else {
        curStr += curChar
      }

      scanner++
    }

    (colonIndex !== -1) && addSubAttr(curStr, colonIndex, result)
  }

  return result
}

function parseAttrs(data: string) {
  data = `${(data || '').trim()} `
  const result = {}
  const attrsList = []
  let scanner = 0
  let pointer = 0
  let isQuote = false
  const valueRegs = [ // The format of the property value.
    /"(.*)"/, // String
    /\{(.*)\}/ // Expression
  ]

  while (scanner < data.length) {
    const char = data[scanner]

    if (char === '"' || char === '{' || char === '}') {
      isQuote = !isQuote
    } else if (char === ' ' && !isQuote) {
      const attr = data.substring(pointer, scanner).trim()
      attr && attrsList.push(attr)
      pointer = scanner
    }

    scanner++
  }

  attrsList.forEach(attr => {
    const attrData = attr.split('=')
    const key = toCamelCase(attrData[0])
    const value = attrData.slice(1).join('=') // There may be multiple equal signs; only the first equal sign should be split, and the remaining string should be recombined.

    if (typeof value === 'undefined') {
      throw new Error(`value of attribute "${key}" is undefined`)
    } else if (valueRegs[0].test(value)) {
      result[key] = parseSubAttrs(valueRegs[0].exec(value)[1])
    } else if (valueRegs[1].test(value)) {
      result[key] = parseSubAttrs(eval(valueRegs[1].exec(value)[1]))
    } else {
      throw new Error(`value of attribute "${key}" without quote`)
    }
  })

  return result
}

export { parseSubAttrs }
export default parseAttrs
