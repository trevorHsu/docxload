# docxload
![NPM version][npm-image]

[中文文档][cn-doc-url]

To generate .docx files on front-end by tag template.

<br>

> **docxload** is a tool for generating .docx files, which is developed based upon [docx][docx-url]. The package **docx** has rich configuration to meet most of demand about setting document content and content style, but its detailed configuration rules sometimes would generate a relatively complexed code. When there are too many document style or content, **docx**'s nested style code would become low-readable, which is not good for maintenance. 
<br><br>
**docxload** simplifies **docx**'s configuration. It uses tag string to represent **docx**'s class and generates **docx** configuration by combining different tags, which is easier to code and to read.

<br>

## Installation
```shell
$npm install --save docxload
```

<br>

## Usage
```js
import docxload from 'docxload'

// when a tag attribute's data type is string, using Double quotes
// when a tag attribute's data type is js expression, using curly braces
// a tag attribute could have multiple subattributes configured as "key1: value1; key2: value2;", such as the "underline" attribute
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
For more configuration examples, check out [demo][demo-url].

<br>

## API
```ts
function docxload(template: string, option?: object | string): Promise
```

### Payloads:
**docxload** has 2 parameters：<br>
*template*：tag template；*option*：configuration option，is an optional parameter；<br>

When *option*'s data type is string, it would set the generated file's name;<br>
When *option*'s data type is object, it has following configuration fields:
| Field | Description | Type | Default |
| - | - | :-: | - |
| fileName | the generated file's name，its default extension name is *.docx* | String | data.docx |
| immediate | whether to generate a document immediately;<br> if false, docxload will generate the document's binary data in memory | Boolean | true |

### Returns:
--------------------------
**docxload** would return a Promise instance which resolves an array **[blob, exportFile]**:
| Array Member | Description | Type |
| - | - | - |
| blob | a Binary Object of the file to be generated | Blob |
| exportFile | a method for generating a file;<br> *exportFile(blob, fileName)*<br>accepts 2 parameters：blob as binary object，fileName as file name | Function |

### Example:
```js
let template = ...
function docxToPdf() { ... }

docxload(template, { immediate: false }).then(([blob, exportFile]) => {
  // processing the blob object
  let pdfBlob = docxToPdf(blob)
  exportFile(pdfBlob, 'data.pdf')
}).catch(err => {
  console.log('failed', err)
})
```

<br>

## Tags
**docxload** has 2 types of tag：<br>
1. corresponding with a class in **docx**, supporting almost all the configuration of the class;
2. representing some configuration code of **docx**

<br>

| Tag | Description | Class in **docx** | Configurable |
| :-: | - | :-: | :-: |
| \<page>\</page> | a page in the document | - | √ |
| \<title>\</title> | title | - | × |
| \<p>\</p> | paragraph | [Paragraph][docx-doc-paragraph] | √ |
| \<span>\</span> | text | [TextRun][docx-doc-text] | √ |
| \<img /> | image | [ImageRun][docx-doc-image] | √ |
| \<table>\</table> | table | - | √ |
| \<row>\</row> | a row of the table | - | √ |
| \<cell>\</cell> | a cell of the table | -  | √ |
| \<br /> | break line | - | × |
| \<template>\</template> | a placeholder, no meaning | - | × |

<br>

Tags should be nested according to the following level rules, tags at the same level should not be nested:

**page** > **title, p, table** > **span, img, br**

**table** > **row** > **cell**

*note: the second level of the tags must be one of \<title\>, \<p\> or \<table\>.*

*\<template> can be embeded in any tag level; <br> when writing a template in jsx syntax, some environment require a root tag in the template; \<template> can be the root tag.*

<br>

## Tag Attributes
The following attributes have simplified some configurations of **docx**. For more attributes of a tag, please check out the documentation of the tag's corresponding class in **docx**. Please refer to this documentation when an attribute configuration is different from **docx**'s.

### **page**
| Attribute | Description | Type | Option | Default |
| - | - | - | - | - |
| orientation | orientation of the page | String | vertical - portrait <br> horizontal - landscape | vertical |
| header | page header, it has several subattributes:<br>**alignment:** horizontal alignment;<br>**format:** string template, which provides template variables including current page number *$pageCurrent*, total page amount *$pageTotal*;<br>**area:** specific pages on which the header can be showed;<br>all attributes of tag \<span\> are supported | String | **alignment:**<br>center, left, right, distribute, both, start, end;<br>**area:**<br>all - all pages,<br>odd - odd number pages,<br>even - even number pages | - |
| footer | page footer, its attribute configuration is identical to header's | String | - | - |

### **p**
| Attribute | Description | Type | Option | Default |
| - | - | - | - | - |
| alignment | horizontal alignment | String | center, left, right, distribute, both, start, end | left |
| heading | title level | String | title, heading_1, heading_2, heading_3, heading_4, heading_5, heading_6 | - |
| indent | to increase indentation, one unit is one Tab indentation | Number | - | - |
| spacing | paragraph spacing, it has 4 subattributes:<br>**before:** spacing before paragraph, number, unit: pound;<br>**after:** spacing after paragraph, number, unit: pound;<br>**line-rule:** line rule;<br>**line:** line spacing value, number, its unit is decided by *line-rule* | String | **line-rule:**<br>multiple - multiple line spacing，*line*'s unit is row<br>atLeast - the minimum line spacing，*line*'s unit is pound | - |

### **span**
| Attribute | Description | Type | Option | Default |
| - | - | - | - | - |
| font-size | font size of text | Number | - | 20 |
| bold | to make text bold | Boolean | - | false |
| italics | italic text | Boolean | - | false |
| color | text color, using color name or color hex values | String | - | - |
| highlight | to highlight text, using color name | String | - | - |
| all-caps  | to transform all the letters into capital letters | Boolean | - | false |
| small-caps | to transform all the letters into capital letters in mini style | Boolean | - | false |
| strike | strikethrough | Boolean | - | false |
| double-strike | double strikethrough | Boolean | - | false |
| super-script | superscript | Boolean | - | false |
| sub-script | subscript | Boolean | - | false |
| underline | underline<br /> When is Boolean type and the value is true, using default underline style;<br />When is String type, it has two subattributes:<br>**type:** underline type; **color:** underline color | String, Boolean | **type:**<br/>single, word, double, thick, dotted, dottedheav, dash,<br /> dashedheav, dashlong, dashlongheav, dotdash,dashdotheavy,<br />  dotdotdas, dashdotdotheavy, wave, wavyheavy, wavydouble; | false |

### **img**
| Attribute | Description | Type | Option | Default |
| - | - | - | - | - |
| width | width of the image | Number | - | 100 |
| height | height of the image | Number | - | 100 |
| src | image resource, can be both url or base64 encoded data<br>when the src value is an url，**docxload** will request for the image automatically | String | - | - |

### **table**
| Attribute | Description | Type | Option | Default |
| - | - | - | - | - |
| width | the entire width of a table,<br>unit: % | String | - | 100% |

### **row**
| Attribute | Description | Type | Option | Default |
| - | - | - | - | - |
| height | the height of a row,<br>unit: cm | String, Number | - | 1cm |

### **cell**
| Attribute | Description | Type | Option | Default |
| - | - | - | - | - |
| width | the width of a cell,<br>unit: %,<br>the percentage is relative to the entire table width | String | - | average width |
| colspan | to merge columns | Number | - | - |
| rowspan | to merge rows | Number | - | - |
| align | horizontal alignment | String | center, left, right, distribute, both, start, end | center |
| vertical-align | vertical alignment | String | center, bottom, top | center |
| fontSize | font size | Number | - | 20 |
| border | borders of a cell, it has 3 subattributes:<br> **style：** border style <br>**size：** border width, Number <br>**color：** border color, color hex values | String | **style:** <br> single, dash_dot_stroked, dashed,dash_small_gap, dot_dash, dot_dot_dash, <br>dotted, double, double_wave, inset, nil, <br>none, outset, thick, thick_thin_large_gap, thick_thin_medium_gap, <br>thick_thin_small_gap, thin_thick_large_gap, thin_thick_medium_gap, thin_thick_small_gap, thin_thick_thin_large_gap,<br>thin_thick_thin_medium_gap, thin_thick_thin_small_gap, three_d_emboss, three_d_engrave, triple, wave  | - |
| border-top<br> border-right<br> border-bottom<br> border-left | a border of a cell, its attribute configuration is indentical to border's | String | - | - |

[npm-image]: https://badge.fury.io/js/docxload.svg
[docx-url]: https://github.com/dolanmiu/docx
[demo-url]: https://github.com/trevorHsu/docxload/tree/main/test/src
[cn-doc-url]: https://github.com/trevorHsu/docxload/blob/main/README.CN.md

[docx-doc-paragraph]: https://docx.js.org/#/usage/paragraph
[docx-doc-text]: https://docx.js.org/#/usage/text
[docx-doc-image]: https://docx.js.org/#/usage/images
