const pipe = function(...fns) {
  return async val => {
    let result = val

    for (let fn of fns) {
      result = await Promise.resolve(fn(result))
    }

    return result
  }
}

const syncMap = async function (array, fn) {
  let result = []

  if (array && array.length) {
    for (let item of array) {
      let res = await Promise.resolve(fn(item))
      result.push(res)
    }
  }

  return result
}

export { pipe, syncMap }
