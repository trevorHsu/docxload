import { Document, Paragraph } from 'docx'
import breakLine from './breakLine'
import image from './image'
import text from './text/index'
import title from './title'
import { table, tableRow, tableCell } from './table/index'
import paragraph from './paragraph/index'
import section from './section/index'

function combineComponents(...sections: any[]) {
  const doc = new Document({
    evenAndOddHeaderAndFooters: true,
    sections: sections && sections.length
      ? sections
      : [{ children: [new Paragraph('')] }]
  })

  return doc
}

export { breakLine, image, text, title, table, tableRow, tableCell, paragraph, section, combineComponents }
