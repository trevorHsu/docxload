import { UnderlineType } from 'docx'
import { type DocxAttrsType, type AttrsProcessorType } from '../../types'

function underline(val: boolean | null | undefined | Record<string, any>, attrs: DocxAttrsType) { // 下划线
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

function fontSize(val: string | number | undefined | null, attrs: DocxAttrsType) {
  if (!val) {
    return
  }

  attrs.size = Number(val) || 20
}

export default { underline, fontSize } as AttrsProcessorType
