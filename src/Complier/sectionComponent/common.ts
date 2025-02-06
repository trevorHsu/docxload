import { type DocxAttrsType, type CommonConfType, type AttrsProcessorType } from '../types'

function addAttrs(obj: DocxAttrsType, attrs: DocxAttrsType, shouldOverwrite: boolean = true) {
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

function addConfAttrs(conf: CommonConfType, attrs: DocxAttrsType, shouldOverwrite: boolean = true) {
  if (!conf.attrs) {
    conf.attrs = {}
  }

  addAttrs(conf.attrs, attrs, shouldOverwrite)
}

function getAttrs(conf: CommonConfType): DocxAttrsType {
  return conf.attrs || {}
}

function processAttrs(
  attrs: DocxAttrsType, 
  handler: AttrsProcessorType
) {
  Object.keys(handler).forEach(key => {
    handler[key](attrs[key], attrs)
  })
}

export { addAttrs, addConfAttrs, getAttrs, processAttrs }
