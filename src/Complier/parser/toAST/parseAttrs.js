import { toCamelCase } from '@src/utils/string'
import { BASE64_PATTERN } from '@src/utils/parse'

// 将字符串格式 "key1: value1; key2: value2" 转成对象 { key1: value1, key2: value2 }
function parseSubAttrs(data) {
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
        if (colonIndex !== -1) {
          let key = curStr.substring(0, colonIndex).trim()
          let value = curStr.substring(colonIndex + 1).trim()
          if (key && value) result[key] = value
        }

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

    if (colonIndex !== -1) {
      let key = curStr.substring(0, colonIndex).trim()
      let value = curStr.substring(colonIndex + 1).trim()
      if (key && value) result[key] = value
    }
  }

  return result
}

function parseAttrs(data) {
  data = `${(data || '').trim()} `
  const result = {}
  const attrsList = []
  let scanner = 0
  let pointer = 0
  let isQuote = false
  const valueRegs = [ // 属性值的格式
    /"(.*)"/, // 字符串
    /\{(.*)\}/ // 表达式
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
    const value = attrData.slice(1).join('=') // 可能有多个等号，只分开第一个等号，剩下的字符串重新合并

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

export default parseAttrs
