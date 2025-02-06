const BASE64_PATTERN = /data:(.*);base64,(?:[A-Za-z0-9+\/]{4}\n?)*(?:[A-Za-z0-9+\/]{2}==|[A-Za-z0-9+\/]{3}=)?/

function getImg(src: string) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    let img = new Image()
    img.setAttribute('crossOrigin', 'anonymous')
    img.src= src

    img.onload = function() {
      resolve(img)
    }
    img.onerror = function(err) {
      reject(err)
    }
  })
}

function getImgTypeFromBase64 (src?: string) {
  if (!src) {
    return ''
  }

  const match = BASE64_PATTERN.exec(src)
  const mime = match[1] || ''
  const imgType = mime.split('/')[1] || ''

  return imgType
}

async function imgSrcToBase64(src: string) {
  if (BASE64_PATTERN.test(src)) {
    return src
  }

  let img = await getImg(src)
  let canvas = document.createElement("canvas")
  let ctx = canvas.getContext("2d")

  canvas.width = 0
  canvas.height = 0

  if (img && ctx) {
    canvas.width = img.width
    canvas.height = img.height
    ctx.drawImage(img, 0, 0, img.width, img.height)
  }

  let dataURL = canvas.toDataURL()

  return dataURL
}

export { imgSrcToBase64, BASE64_PATTERN, getImgTypeFromBase64 }
