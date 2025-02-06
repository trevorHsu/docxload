import { Packer, Document } from 'docx'

// Generate a Blob
const toBlob = function(doc: Document) {
  return Packer.toBlob(doc)
}

export default toBlob
