import { HeadingLevel } from 'docx'
import spacingDataHandler from './spacingDataHandler'


function heading(val, attrs) { // 标题等级
  if (!val) {
    return
  }

  attrs.heading = HeadingLevel[val.toUpperCase()]
}

function indent(val, attrs) { // 增加缩进
  if (!val) {
    return
  }

  const oneTab = 500
  val = Math.abs(Number(val))

  if (val) {
    attrs.indent = { left: val * oneTab }
  }
}

function spacing(val, attrs) { // 段落间距，有4个子属性：before after line lineRule
  if (!val) {
    return
  }

  let result = {}
  let spacing = spacingDataHandler(val)

  Object.entries(spacing).forEach(([key, value]) => {
    if (value) {
      result[key] = value
    }
  })

  attrs.spacing = result
}

export default { heading, indent, spacing }
