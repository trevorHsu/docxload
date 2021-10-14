import { addConfAttrs, getAttrs } from '../sectionComponent/common'
import { PAGE_ORIENTATION } from '../sectionComponent/section/variables'

const walkConfs = function(confs, fn) {
  if (!confs || !confs.length) {
    return
  }

  const queque = [...confs]

  while (queque.length) {
    const cur = queque.shift()

    if (cur.children && cur.children.length) {
      queque.push(...cur.children)
    }

    fn && fn(cur)
  }
}

// 附加属性统一在这里添加
const addAdditionalAttrs = function(sectionConf) {
  const { orientation } = getAttrs(sectionConf)
  const additionalAttrs = {}

  if (orientation && orientation === 'horizontal') {
    Object.assign(additionalAttrs, {
      _pageOrientation_: PAGE_ORIENTATION.horizontal
    })
  }

  Object.keys(additionalAttrs).length && walkConfs(sectionConf.children, itemConf => {
    addConfAttrs(itemConf, additionalAttrs)
  })

  return sectionConf
}

export default addAdditionalAttrs
