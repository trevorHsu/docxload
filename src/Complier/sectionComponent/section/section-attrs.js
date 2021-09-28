import { PageOrientation } from 'docx'
import getHeaderAndFooterConf from './getHeaderAndFooterConf'

const PAGE_ORIENTATION = {
  vertical: PageOrientation.PORTRAIT,
  horizontal: PageOrientation.LANDSCAPE
}

function orientation(val, attrs) { // 页面方向
  val = val || 'vertical'

  attrs.properties = {
    page: {
      size: {
        orientation: PAGE_ORIENTATION[val] || PageOrientation[val.toUpperCase()] || PAGE_ORIENTATION.vertical
      }
    }
  }
}

function header(val, attrs) { // 页眉
  if (!val || !val.format) {
    return
  }

  attrs.headers = getHeaderAndFooterConf('header', val)
}

function footer(val, attrs) { // 页脚
  if (!val || !val.format) {
    return
  }

  attrs.footers = getHeaderAndFooterConf('footer', val)
}

export default { orientation, header, footer }
