import { ImageRun } from 'docx'
import { getAttrs } from './common'

function image(conf) {
  const { width, height, src } = getAttrs(conf)

  const imageConf = {
    data: src || '',
    transformation: {
      width: width ? Number(width) : 100,
      height: height ? Number(height) : 100
    }
  }
  return new ImageRun(imageConf)
}

export default image
