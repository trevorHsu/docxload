import { ImageRun } from 'docx'
import { getAttrs, addAttrs } from './common'
import { type CommonConfType } from '../types'
import { getImgTypeFromBase64 } from '@src/utils/parse'

function image(conf: CommonConfType) {
  const attrs = getAttrs(conf)
  const { width, height, src } = attrs

  const imgType = getImgTypeFromBase64(src) as "jpg" | "png" | "gif" | "bmp"
  const imgSrc = `${src || ''}` as string

  const imageConf = {
    type: imgType,
    data: imgSrc,
    transformation: {
      width: width ? Number(width) : 100,
      height: height ? Number(height) : 100
    }
  }

  addAttrs(imageConf, attrs, false)

  return new ImageRun(imageConf)
}

export default image
