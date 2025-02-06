import getHeaderAndFooterConf from './getHeaderAndFooterConf'
import { PAGE_ORIENTATION } from './variables'
import { type DocxAttrsType, type AttrsProcessorType } from '../../types'

function orientation(val: string, attrs: DocxAttrsType) { // page orientation
  val = val || 'vertical'

  attrs.properties = {
    page: {
      size: {
        orientation: PAGE_ORIENTATION[val] || PAGE_ORIENTATION.vertical
      }
    }
  }
}

function header(val: any, attrs: DocxAttrsType) { // page header
  if (!val || !val.format) {
    return
  }

  attrs.headers = getHeaderAndFooterConf('header', val)
}

function footer(val: any, attrs: DocxAttrsType) { // page footer
  if (!val || !val.format) {
    return
  }

  attrs.footers = getHeaderAndFooterConf('footer', val)
}

export default { orientation, header, footer } as AttrsProcessorType
