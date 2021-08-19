import exportWord from './exportWord'

class Export {
  constructor(data) {
    this.data = data
  }

  export(title) {
    return exportWord(this.data, title)
  }
}

export default Export
