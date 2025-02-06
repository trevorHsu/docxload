import { addConfAttrs, getAttrs } from '../sectionComponent/common'
import { PAGE_ORIENTATION } from '../sectionComponent/section/variables'
import { type CommonConfType } from '../types'

const walkConfs = function(confs: CommonConfType[] | null | undefined, fn: (confItem: CommonConfType) => void) {
  if (!confs || !confs.length) {
    return
  }

  const queue = [...confs]

  while (queue.length) {
    const cur = queue.shift()

    if (cur.children && cur.children.length) {
      queue.push(...cur.children)
    }

    fn && fn(cur)
  }
}

// Additional properties should be added here uniformly.
const addAdditionalAttrs = function(sectionConf: CommonConfType) {
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
