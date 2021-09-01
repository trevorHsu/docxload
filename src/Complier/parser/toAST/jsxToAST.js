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

export default jsxToAST
