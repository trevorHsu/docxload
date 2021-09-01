import { UnderlineType } from 'docx'

function underline(val) { // 下划线
  let result

  if (typeof val === 'object') {
    const { type, color } = val
    result = {
      type: type && UnderlineType[type.toUpperCase()],
      color
    }
  } else if (!!val) {
    result = {
      type: UnderlineType.SINGLE
    }
  }

  return { underline: result }
}

function fontSize(val) {
  let result= Number(val) || 20

  return { size: result }
}

export default { underline, fontSize }
