import parseAttrs from "./parseAttrs"

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

export default strToAST
