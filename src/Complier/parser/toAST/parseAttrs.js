import { toCamelCase } from '@src/utils/string'

// 将字符串格式 "key1: value1; key2: value2" 转成对象 { key1: value1, key2: value2 }
function parseSubAttrs(data) {
  let result = data

  if (data && typeof data === 'string' && data.indexOf(';') !== -1) {
    result = {}

    // 扫描字符串  找出 key value


  //   data.split(';').forEach(item => {
  //     let pair = item.split(':')
  //     pair[0]
  //   })

  // let left = data

  // let 


  // while (left.length) {
  //   let curVal = left[0]


  //   if (curVal === ';') {

  //   } else if (curVal === ':') {

  //   } else {

  //   }




  // }





  /**
   * a: b; c: d
   * a: ;; b: c;
   * a: fsd:;
   * 
   * ;fasdf
   * 
   */

  //   "a: d;c:d;"
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
