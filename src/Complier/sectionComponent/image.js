import { ImageRun } from 'docx'
import { getAttrs, addAttrs } from './common'

function image(conf) {
  const attrs = getAttrs(conf)
  const { width, height, src } = attrs

  const imageConf = {
    data: src || '',
    transformation: {
      width: width ? Number(width) : 100,
      height: height ? Number(height) : 100
    }
  }

  addAttrs(imageConf, attrs, false)

  return new ImageRun(imageConf)
}

export default image
