import { HeightRule } from 'docx'
import { type DocxAttrsType, type AttrsProcessorType } from '@src/Complier/types'

const unitHeight = 565.5 // Equivalent to 1 cm in Word
const heightReg = /^((0|([1-9]\d*))(\.\d+)?)(cm)?/

function height(val: string, attrs: DocxAttrsType) {
  const heightValue = heightReg.test(val) ? Number(heightReg.exec(val)[1]) : 1

  attrs.height = {
    value: heightValue * unitHeight,
    rule: HeightRule.ATLEAST
  }
}

export default { height } as AttrsProcessorType
