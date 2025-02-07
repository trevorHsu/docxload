const proxyHandler:ProxyHandler<object> = {
  get(target, prop) {
    if (prop === 'window') {
      throw new Error('Access to window is not allowed')
    }
    return prop in target ? target[prop] : undefined
  },
  set(target, prop, value) {
    if (prop === 'window') {
      throw new Error('Modification of window is not allowed')
    }
    target[prop] = value
    return true
  },
  has(target, key) {
    return true
  }
}

class ProxySandbox {
  running: boolean
  proxy: typeof Proxy

  constructor() {
    this.running = false
    const fakeWindow = Object.create(null)
    this.proxy = new Proxy(fakeWindow, proxyHandler)
  }
  active() {
    this.running = true
  }
  inactive() {
    this.running = false
  }
}

const sandbox = new ProxySandbox()
sandbox.active()

function simpleEval (code: string) {
  if (typeof code !== 'string') {
    return code
  }

  code = code.trim()

  const fn = new Function( 'sandbox', `
    with (sandbox.proxy) {
      return ${code}
    }
  `)

  return fn(sandbox)
}

export {
  simpleEval
}
