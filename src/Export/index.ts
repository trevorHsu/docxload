import exportFile from './exportFile'

type ExportResultType = [
  Blob,
  (blob: Blob, fileName?: string) => void
]

class Export {
  blob: Blob

  constructor(blob: Blob) {
    this.blob = blob
  }

  export(fileName?: string, immediate?: boolean) {
    immediate && exportFile(this.blob, fileName)

    return Promise.resolve([
      this.blob,
      (blob: Blob, newFileName?: string) => exportFile(blob, newFileName || fileName)
    ] as ExportResultType)
  }
}

export default Export
