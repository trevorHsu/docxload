function toCamelCase(str) {
  const list = (str || '').split('-')

  return list.slice(1).reduce((prev, cur) => {
    cur = cur && (cur[0].toUpperCase() + cur.substring(1))
    return prev + cur
  }, list[0])
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
      result[key] = valueRegs[0].exec(value)[1]
    } else if (valueRegs[1].test(value)) {
      result[key] = eval(valueRegs[1].exec(value)[1])
    } else {
      throw new Error(`value of attribute "${key}" without quote`)
    }
  })

  return result
}

function parsePropsFromJsx (temp) {
  let result
  if (temp.tag) {
    result = {
      tag: temp.tag,
      attrs: (temp.data && temp.data.attrs)  || {},
      children: null
    }
    if (temp.children && temp.children.length) {
      result.children = temp.children.map(child => parsePropsFromJsx(child))
    }
  } else {
    result = { text: temp.text }
  }
  return result
}

function fetchRoot (tree) {
  if (tree.tag === 'page') {
    return [tree]
  } else if (tree.tag === 'template') {
    let result
    if (tree.children && tree.children.length) {
      result = tree.children.reduce((pre, curr) => pre.concat(fetchRoot(curr)), [])
    }
    return result
  } else {
    return []
  }
}

function jsxToAST (template) {
  const result = parsePropsFromJsx(template)
  const realRoot = fetchRoot(result)
  return realRoot
}

function strToAST (template) {
  const beginReg = /^\<(\s*[0-9A-Za-z]+)(\s[^\<^\/]*)?\>/
  const endReg = /^\<\/(\s*[0-9A-Za-z]+\s*)\>/
  const selfClosingReg = /^\<(br|img)(\s[^\<]*)?\/\>/
  const contentReg = /^([^\>]+)\<(\s*[0-9A-Za-z]+)(\s[^\<]*)?\>/
  const contentReg2 = /^([^\<]+)\<\/(\s*[0-9A-Za-z]+\s*)\>/

  let index = 0
  let rest = template
  const root = [{ children: [] }]

  while (index < template.length - 1) {
    rest = template.substring(index)

    if (beginReg.test(rest)) { // bgein tag
      const beginRegRes = beginReg.exec(rest)
      let tag = beginRegRes[1]
      const attrsStr = beginRegRes[2] ? beginRegRes[2] : ''

      index += (tag.length + attrsStr.length + 2)
      tag = tag.trim()

      root.push({
        tag,
        children: [],
        attrs: parseAttrs(attrsStr)
      })
    } else if (endReg.test(rest)) { // end tag
      let tag = endReg.exec(rest)[1]
      index += tag.length + 3
      tag = tag.trim()

      if (tag === root[root.length - 1].tag) {
        if (root.length > 1) {
          const tagChildren = root.pop()
          root[root.length - 1].children.push(tagChildren)
        }
      } else {
        throw new Error(`template tag [${tag}] not matched`)
      }
    } else if (selfClosingReg.test(rest)) { // self closing
      const selfClosingRegRes = selfClosingReg.exec(rest)
      let tag = selfClosingRegRes[1]
      const attrsStr = selfClosingRegRes[2] ? selfClosingRegRes[2] : ''

      index += (tag.length + attrsStr.length + 3)
      tag = tag.trim()

      root[root.length - 1].children.push({
        tag,
        attrs: parseAttrs(attrsStr)
      })
    } else if (contentReg.test(rest) || contentReg2.test(rest)) { // content
      const content = contentReg.test(rest) ? contentReg.exec(rest)[1] : contentReg2.exec(rest)[1]
      index += content.length

      content.trim() && root[root.length - 1].children.push({ text: content })
    } else {
      index++
    }
  }

  if (root.length > 1) {
    throw new Error(`template tag [${root[root.length - 1].tag}] not matched`)
  }
  return root[0].children
}

function toAST(template) {
  if (typeof template === 'object') {
    return jsxToAST(template)
  }
  if (typeof template === 'string') {
    return strToAST(template)
  }
}

export default toAST
