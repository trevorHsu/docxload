const pipe = function(...fns: Function[]) {
  return async (param: any) => {
    let result = param

    for (let fn of fns) {
      result = await Promise.resolve(fn(result))
    }

    return result
  }
}

const syncMap = async function (array: any[], fn: Function) {
  let result = array && array.length
    ? await Promise.all(array.map(item => fn(item)))
    : []

  return result
}

const flatArray = function(array: any[]) {
  let result = [] as any[]

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
