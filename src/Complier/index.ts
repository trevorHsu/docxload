import compile from './compile'

class Complier {
  rawData: string
  
  constructor(rawData: string) {
    this.rawData = rawData
  }

  compile() {
    return compile(this.rawData)
  }
}

export default Complier
