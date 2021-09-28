import docxload from '@src/index'

_.addBtn('delay download', done => {
  let template = `
    <page>
      <p>
        <img width="200" height="150" src="https://tse4-mm.cn.bing.net/th/id/OIP-C.QYq9ucU9cbRRJPQKg24ntAHaEr?w=263&h=180&c=7&o=5&pid=1.7" />
      </p>
    </page>
  `

  docxload(template, { immediate: false })
    .then(([blob, exportFile]) => {
      setTimeout(() => {
        console.log(blob)
        exportFile(blob, 'delay download')
        done()
      }, 1000)
    })
})
