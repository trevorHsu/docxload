import { 
  Header, Footer, PageNumber
} from 'docx'
import { generateComponents } from '@src/Complier/generator'
import { COMPONENT_TYPES } from '@src/Complier/types'

const { PARAGRAPH, TEXT } = COMPONENT_TYPES

const SPLIT_MARK = `split-mark-${Math.round(Math.random() * 1000)}`
const FORMAT_KEY_MAP = {
  '$pageCurrent': `${SPLIT_MARK}${PageNumber.CURRENT}${SPLIT_MARK}`,
  '$pageTotal': `${SPLIT_MARK}${PageNumber.TOTAL_PAGES}${SPLIT_MARK}`
}


function getTextList(text) {
  Object.entries(FORMAT_KEY_MAP).forEach(([formatKey, value]) => {
    text = text.replace(formatKey, value)
  })

  const result = text.split(SPLIT_MARK).filter(item => item)

  return result
}

function formatContent(type, conf) {
  const FormatCls = type === 'header' ? Header : Footer
  const { format } = conf
  const textList = getTextList(format)

  const paragraphConf = {
    type: PARAGRAPH,
    attrs: conf,
    children: [{
      type: TEXT,
      attrs: conf,
      value: textList
    }]
  }

  return new FormatCls({
    children: generateComponents([paragraphConf])
  })
}

function getAreaConf(area, formatConf) {
  area = area || 'all'
  const areaKeyMap = {
    'all': ['default', 'first', 'even'],
    'odd': ['default', 'first'],
    'even': ['even'],
  }
  let result = {}

  areaKeyMap[area] && areaKeyMap[area].forEach(key => {
    result[key] = formatConf
  })

  return result
}

function getConf(type, conf) {
  let formatConf = formatContent(type, conf)

  return getAreaConf(conf.area, formatConf)
}

export default getConf
