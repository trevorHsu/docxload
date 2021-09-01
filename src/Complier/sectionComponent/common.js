function addAttrs(obj, attrs, shouldOverwrite = true) {
  Object.entries(attrs).forEach(([key, val]) => {
    if (shouldOverwrite) {
      if (typeof val !== 'undefined') {
        obj[key] = val
      }
    } else {
      if (typeof obj[key] === 'undefined' && typeof val !== 'undefined') {
        obj[key] = val
      }
    }
  })
}

function addConfAttrs(conf, attrs, shouldOverwrite = true) {
  if (!conf.attrs) {
    conf.attrs = {}
  }

  addAttrs(conf.attrs, attrs, shouldOverwrite)
}

function getAttrs(conf) {
  return conf.attrs || {}
}

function processAttrs(attrs, handler) {
  // handler[key] 为属性处理方法，返回一个对象
  Object.keys(attrs).forEach(key => {
    handler[key] && Object.assign(attrs, handler[key](attrs[key], attrs))
  })
}

export { addAttrs, addConfAttrs, getAttrs, processAttrs }
