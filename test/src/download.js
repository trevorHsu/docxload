import exportWord from '@src/index'

function addBtn(name, template) {
  let baseStyle = 'font-weight: bold; background: #4679a7; color: #fff; padding: 4px 6px; border-radius: 6px;'

  _.addBtn({
    name,
    onClick() {
      let beginTime = Date.now()
      console.log(`%cbegin: ${name}`, baseStyle)

      exportWord(template).then(res => {
        let endTime = Date.now()
        console.log(`%cend: ${name}%c  [${endTime - beginTime} ms]`, baseStyle, 'color: green;')
      })
    }
  })
}

addBtn(
  '一般文档', `
  <page>
    <p>hello</p>
  </page>
  ` )
