import { TextRun } from 'docx'

function breakLine(conf?: any) {
  return new TextRun({
    text: '',
    break: 1
  })
}

export default breakLine
