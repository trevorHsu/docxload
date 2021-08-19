import { generateComponents } from '../generator'
import { PageOrientation } from 'docx'
import { getAttrs } from './common'

const PAGE_ORIENTATION = {
  vertical: PageOrientation.PORTRAIT,
  horizontal: PageOrientation.LANDSCAPE
}

function section(conf) {
  const { orientation } = getAttrs(conf)

  return {
    properties: {
      page: {
        size: {
          orientation: (orientation && (PAGE_ORIENTATION[orientation] || PageOrientation[orientation.toUpperCase()])) || PAGE_ORIENTATION.vertical
        }
      }
    },
    children: generateComponents(conf.children)
  }
}

export default section
