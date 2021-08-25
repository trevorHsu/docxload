import './style.css'

function addBtnDom({ name, onClick } = {}) {
  let container = document.querySelector('#btn-container')
  let btn = document.createElement('div')
  btn.setAttribute('class', 'btn')
  btn.setAttribute('tabindex', '1')
  btn.setAttribute('title', name)

  btn.innerHTML = name || 'button'
  onClick && btn.addEventListener('click', onClick)

  container.appendChild(btn)
}

function addBtn(name, fn) {
  let baseStyle = 'font-weight: bold; background: #4679a7; color: #fff; padding: 4px 6px; border-radius: 6px;'

  addBtnDom({
    name,
    onClick() {
      console.log(`%cbegin: ${name}`, baseStyle)

      const beginTime = Date.now()
      const handler = () => new Promise(resolve => fn ? fn(resolve) : resolve())

      handler().then(() => {
        const endTime = Date.now()
        console.log(`%cend: ${name}%c  [${endTime - beginTime} ms]`, baseStyle, 'color: green;')
      }).catch(err => {
        console.error(`failed: ${name}%c`, err)
      })
    }
  })
}

export default addBtn
