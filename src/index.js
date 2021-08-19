import Complier from './Complier'
import Export from './Export'

const exportWord = function(template, title) {
  const complier = new Complier(template)

  return complier.compile().then(blob => {
    const packer = new Export(blob)
    packer.export(title)
  })
}

export default exportWord

/**
 * template 可用标签及属性
 *
 * <page></page> 一页内容，其他标签都要在page下，允许多个page在同一层级
 * orientation
 *
 *
 * <title></title> 一级标题
 *  font-size  color  background-color
 *
 *
 * <p></p> 段落
 * font-size  color  background-color
 *
 *
 * <table></table> 表格
 *
 *
 * <row></row> 表格行
 * height
 *
 *
 * <cell></cell> 单元格
 * colspan  rowspan  font-size  color  background-color
 *
 *
 * <span></span>
 * font-size  color  background-color
 *
 *
 * <img /> 图片
 * width height src
 *
 *
 * <br /> 换行
 *
 *
 */
