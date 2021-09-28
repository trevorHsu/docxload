# docxload
![NPM version][npm-image]

[EN Doc][en-doc-url]

通过标签模板的配置来实现 .docx 文件的前端导出。

<br>

>  **docxload** 是基于 [docx][docx-url] 包实现的 .docx 文件导出工具。**docx** 包拥有丰富的配置，能够实现绝大多数 docx 文档的样式需求。但其细致的配置也导致了配置代码相对复杂，当文档样式或内容过多时，其嵌套配置的方式会导致代码可读性降低，维护不方便。
<br><br>
**docxload** 简化了 **docx** 的配置，将一些基础配置封装，并以标签的形式暴露使用。**docxload** 通过标签的组合来完成配置，使配置工作更快，代码更易读；并且它支持 **docx** 的大多数配置，充分利用了 **docx** 的能力，详细配置请见下文。

<br>

## 安装
```shell
$npm install --save docxload
```

<br>

## 使用
```js
import docxload from 'docxload'

// 标签属性值为 String 类型时，用双引号表示值
// 标签属性值为 js 表达式时，用大括号表示值
// 一个属性中，可以有多个子属性配置，形式为："key1: value1; key2: value2;"，如 underline 属性
let template = `
  <page>
    <p>
      <span 
        underline="type: single; color: #000;"
        color="#000"
      >Hello, </span>
      <span font-size={30}>docxload</span>
    </p>
  </page>
`

docxload(template).then(() => {
  console.log('done')
}).catch(err => {
  console.log('failed', err)
})
```
更多配置示例，见[测试用例][demo-url]。

<br>

## API
```ts
function docxload(template: string, option?: object | string): Promise
```

### 方法参数：
**docxload** 方法支持两个参数：<br>
*template*：标签模板；*option*：配置选项，为可选参数；<br>
当 *option* 为 string 类型时，可配置导出文件的文件名；<br>
当 *option* 为 object 类型时，有以下配置选项：
| 配置字段 | 描述 | 字段类型 | 默认值 |
| - | - | :-: | - |
| fileName | 导出文件的文件名，默认后缀名是 *.docx* | String | data.docx |
| immediate | 是否立即导出文件；<br> 若为 false, 程序将生成文档的二进制文件，但不导出 | Boolean | true |

### 返回值：
**docxload** 方法执行后将返回一个 Promise 对象，该 Promise 对象的 resolve 方法会传递一个数组 **[blob, exportFile]**，用于扩展操作：
| 数组成员 | 描述 | 值类型 |
| - | - | - |
| blob | 待导出文件的二进制对象 | Blob |
| exportFile | 用于导出文件的方法 *exportFile(blob, fileName)*；<br>接收两个参数：blob为二进制对象，fileName为文件名 | Function |

### 使用示例：
```js
let template = ...
function docxToPdf() { ... }

docxload(template, { immediate: false }).then(([blob, exportFile]) => {
  // 对 blob 对象进行处理，如转成 pdf 格式
  let pdfBlob = docxToPdf(blob)
  exportFile(pdfBlob, 'data.pdf')
}).catch(err => {
  console.log('failed', err)
})
```

<br>

## 标签类型
**docxload** 中的标签有两种类型：<br>
一种是与 **docx** 包中的类相对应的标签，可支持对应类中的配置选项；<br>
另一种是通过封装 **docx** 包中的一些配置而实现的标签。
<br>

| 标签 | 描述 | docx 中对应的类 | 是否可配置属性 |
| :-: | - | :-: | :-: |
| \<page>\</page> | 文档中的一页 | - | √ |
| \<title>\</title> | 标题 | - | × |
| \<p>\</p> | 段落 | [Paragraph][docx-doc-paragraph] | √ |
| \<span>\</span> | 文本 | [TextRun][docx-doc-text] | √ |
| \<img /> | 图片 | [ImageRun][docx-doc-image] | √ |
| \<table>\</table> | 表格 | - | √ |
| \<row>\</row> | 表格行 | - | √ |
| \<cell>\</cell> | 单元格 | -  | √ |
| \<br /> | 换行 | - | × |

<br>

标签需按以下层级规则进行嵌套，同级标签不可嵌套：

**page** > **title, p, table** > **span, img, br**

**table** > **row** > **cell**

*注意标签中的第二级必须是 title、p、table 之一*

<br>

## 标签属性
以下属性简化了 **docx** 包的配置，其他属性配置见 **docx** 包中对应类的配置，部分属性配置与 **docx** 文档不一样时，以本文档为准。

### **page**
| 属性名 | 描述 | 参数类型 | 可选值 | 默认值 |
| - | - | - | - | - |
| orientation | 页面方向 | String | vertical - 垂直方向 <br> horizontal - 水平方向 | vertical |
| header | 页眉，有多个子属性：<br> **alignment：** 水平对齐；<br>**format：** 字符串模板，该模板提供了模板变量，分别为：当前页码 *$pageCurrent*，总页数 *$pageTotal*；<br>**area：** 规定允许显示表头的页面；<br>支持 \<span\> 标签中的所有属性 | String | **alignment:**<br>center, left, right, distribute, both, start, end;<br>**area:**<br>all - 所有页面,<br>odd - 奇数页,<br>even - 偶数页 | - |
| footer | 页脚，配置规则与页眉相同 | String | - | - |

### **p**
| 属性名 | 描述 | 参数类型 | 可选值 | 默认值 |
| - | - | - | - | - |
| alignment | 水平对齐 | String | center, left, right, distribute, both, start, end | left |
| heading | 标题等级 | String | title, heading_1, heading_2, heading_3, heading_4, heading_5, heading_6 | - |
| indent | 增加缩进，一个单位为一次Tab缩进 | Number | - | - |
| spacing | 段落间距，有4个子属性：<br>**before:** 段前间距，数值类型，单位：磅;<br>**after:** 段后间距，数值类型，单位：磅;<br>**line-rule:** 行距规则;<br>**line:** 行距值，数值类型，单位由 *line-rule* 确定； | String | **line-rule:**<br>multiple - 多倍行距，*line* 的单位为行<br>atLeast - 最小行距，*line* 的单位为磅 | - |

### **span**
| 属性名 | 描述 | 参数类型 | 可选值 | 默认值 |
| - | - | - | - | - |
| font-size | 文字大小 | Number | - | 20 |
| bold | 文字加粗 | Boolean | - | false |
| italics | 斜体文字 | Boolean | - | false |
| color | 文字颜色，颜色名称 或者 16进制颜色 | String | - | - |
| highlight | 高亮文字，颜色名称 | String | - | - |
| all-caps  | 全部大写字母 | Boolean | - | false |
| small-caps | 小型大写字母 | Boolean | - | false |
| strike | 删除线 | Boolean | - | false |
| double-strike | 双删除线 | Boolean | - | false |
| super-script | 上标 | Boolean | - | false |
| sub-script | 下标 | Boolean | - | false |
| underline | 下划线<br /> 当为Boolean类型，且值为true时，使用默认下划线样式；<br />当为String类型时，有两个子属性：<br>**type:** 下划线类型；**color:** 下划线颜色 | String, Boolean | **下划线类型 type:**<br/>single, word, double, thick, dotted, dottedheav, dash,<br /> dashedheav, dashlong, dashlongheav, dotdash,dashdotheavy,<br />  dotdotdas, dashdotdotheavy, wave, wavyheavy, wavydouble; | false |

### **img**
| 属性名 | 描述 | 参数类型 | 可选值 | 默认值 |
| - | - | - | - | - |
| width | 图片宽度 | Number | - | 100 |
| height | 图片高度 | Number | - | 100 |
| src | 图片资源，可以是网络地址，或是base64格式；<br>当 src 值为网络地址时，**docxload** 将自动请求图片资源 | String | - | - |

### **table**
| 属性名 | 描述 | 参数类型 | 可选值 | 默认值 |
| - | - | - | - | - |
| width | 表格总宽度，单位% | String | - | 100% |

### **row**
| 属性名 | 描述 | 参数类型 | 可选值 | 默认值 |
| - | - | - | - | - |
| height | 行高，单位cm | String, Number | - | 1cm |

### **cell**
| 属性名 | 描述 | 参数类型 | 可选值 | 默认值 |
| - | - | - | - | - |
| width | 单元格宽度，单位%，百分比相对于表格总宽度 | String | - | 默认平分单元格宽度 |
| colspan | 合并列 | Number | - | - |
| rowspan | 合并行 | Number | - | - |
| align | 水平对齐 | String | center, left, right, distribute, both, start, end | center |
| vertical-align | 垂直对齐 | String | center, bottom, top | center |
| fontSize | 字体大小 | Number | - | 20 |
| border | 单元格边框，有三个子属性配置：<br> **style：** 边框类型 <br>**size：** 边框宽度 数值 <br>**color：** 边框颜色 16进制颜色 | String | **style:** <br> single, dash_dot_stroked, dashed,dash_small_gap, dot_dash, dot_dot_dash, <br>dotted, double, double_wave, inset, nil, <br>none, outset, thick, thick_thin_large_gap, thick_thin_medium_gap, <br>thick_thin_small_gap, thin_thick_large_gap, thin_thick_medium_gap, thin_thick_small_gap, thin_thick_thin_large_gap,<br>thin_thick_thin_medium_gap, thin_thick_thin_small_gap, three_d_emboss, three_d_engrave, triple, wave  | - |
| border-top<br> border-right<br> border-bottom<br> border-left | 单元格单边边框，参数与border属性相同 | String | - | - |

[npm-image]: https://badge.fury.io/js/docxload.svg
[docx-url]: https://github.com/dolanmiu/docx
[demo-url]: https://github.com/trevorHsu/docxload/tree/main/test/src
[en-doc-url]: https://github.com/trevorHsu/docxload/blob/main/README.md

[docx-doc-paragraph]: https://docx.js.org/#/usage/paragraph
[docx-doc-text]: https://docx.js.org/#/usage/text
[docx-doc-image]: https://docx.js.org/#/usage/images
