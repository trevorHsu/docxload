import { UnderlineType } from 'docx'

function underline(val, attrs) { // 下划线
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

  if (result) {
    attrs.underline = result
  }
}

function fontSize(val, attrs) {
  if (!val) {
    return
  }

  attrs.size = Number(val) || 20
}

export default { underline, fontSize }
