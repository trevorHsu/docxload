import { HeadingLevel } from 'docx'

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

export default { heading, indent }
