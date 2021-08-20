import Complier from './Complier'
import Export from './Export'

const docxload = async function(template, title) {
  const complier = new Complier(template)
  const blob = await complier.compile()
  const packer = new Export(blob)
  packer.export(title)
}

export default docxload
