const BASE64_PATTERN = /data:(.*);base64,(?:[A-Za-z0-9+\/]{4}\n?)*(?:[A-Za-z0-9+\/]{2}==|[A-Za-z0-9+\/]{3}=)?/

function getImg(src) {
  return new Promise((resolve, reject) => {
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

async function imgSrcToBase64(src) {
  if (BASE64_PATTERN.test(src)) {
    return src
  }

  let img = await getImg(src)
  let canvas = document.createElement("canvas")
  let ctx = canvas.getContext("2d")

  canvas.width = img.width
  canvas.height = img.height
  ctx.drawImage(img, 0, 0, img.width, img.height)
  let dataURL = canvas.toDataURL()

  img = null
  ctx = null
  canvas = null

  return dataURL
}

export { imgSrcToBase64, BASE64_PATTERN }
