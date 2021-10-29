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

const flatArray = function(array) {
  let result = []

  if (!array || !(array instanceof Array)) {
    return result
  }

  let stack = [...array]

  while (stack.length) {
    let cur = stack.pop()

    if (cur instanceof Array) {
      stack.push(...cur)
    } else {
      result.push(cur)
    }
  }

  return result.reverse()
}

export { pipe, syncMap, flatArray }
