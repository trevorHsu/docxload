import './style.css'

function addBtn({ name, onClick } = {}) {
  let container = document.querySelector('#btn-container')
  let btn = document.createElement('div')
  btn.setAttribute('class', 'btn')
  btn.setAttribute('tabindex', '1')
  btn.setAttribute('title', name)

  btn.innerHTML = name || 'button'
  onClick && btn.addEventListener('click', onClick)

  container.appendChild(btn)
}

export default addBtn
