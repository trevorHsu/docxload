const COMPONENT_TYPES = {
  SECTION: 'section',
  TITLE: 'title',
  TABLE: 'table',
  PARAGRAPH: 'paragraph',
  IMAGE: 'image',
  TEXT: 'text',
  ROW: 'tableRow',
  CELL: 'tableCell',
  BREAK: 'break',
  TEMPLATE: 'template'
}

type SpacingDataType = {
  before: number|string 
  after: number|string
  lineRule: string
  line: number|string
}

type CommonConfType = any

type DocxAttrsType = Record<string, any>

type AttrsProcessorType = Record<string, (attrValue: any, attrs: DocxAttrsType) => void>

type TableBorderConfType = {
  style?: any
  size?: any
  color?: any
}

type VNodeType = {
  tag?: string
  data?: any
  text?: string
  children?: VNodeType[]
}

type ASTNodeType = {
  tag?: string | symbol
  attrs?: Record<string, any>
  text?: string
  value?: any
  children?: ASTNodeType[]
}

export { 
  COMPONENT_TYPES,
  type SpacingDataType,
  type DocxAttrsType,
  type CommonConfType,
  type AttrsProcessorType,
  type TableBorderConfType,
  type VNodeType,
  type ASTNodeType,
}
