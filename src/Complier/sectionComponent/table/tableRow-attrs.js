import { HeightRule } from 'docx'

const unitHeight = 565.5 // 等于word中的1cm
const heightReg = /^((0|([1-9]\d*))(\.\d+)?)(cm)?/

function height(val, attrs) {
  const heightValue = heightReg.test(val) ? Number(heightReg.exec(val)[1]) : 1

  attrs.height = {
    value: heightValue * unitHeight,
    rule: HeightRule.ATLEAST
  }
}

export default { height }
