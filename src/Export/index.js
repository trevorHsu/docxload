import exportFile from './exportFile'

class Export {
  constructor(data) {
    this.data = data
  }

  export(title) {
    return exportFile(this.data, title)
  }
}

export default Export
