import { HeadingLevel } from 'docx'

function heading(val) { // 标题等级
  let result

  if (val) {
    result = HeadingLevel[val.toUpperCase()]
  }

  return { heading: result }
}

function indent(val) { // 增加缩进
  let result

  if (val) {
    const oneTab = 500
    val = Math.abs(Number(val))

    result = { left: val * oneTab }
  }

  return { indent: result }
}

export default { heading, indent }
