import { Packer } from 'docx'

// 生成blob
const toBlob = function(doc) {
  return Packer.toBlob(doc)
}

export default toBlob
