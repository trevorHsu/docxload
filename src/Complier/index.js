import compile from './compile'

class Complier {
  constructor(rawData) {
    this.rawData = rawData
  }

  compile() {
    return compile(this.rawData)
  }
}

export default Complier
