import { Document, Paragraph } from 'docx'
import breakLine from './breakLine'
import image from './image'
import text from './text'
import title from './title'
import { table, tableRow, tableCell } from './table'
import paragraph from './paragraph'
import section from './section'

function combineComponents(...sections) {
  const doc = new Document({
    evenAndOddHeaderAndFooters: true,
    sections: sections && sections.length
      ? sections
      : [{ children: [new Paragraph('')] }]
  })

  return doc
}

export { breakLine, image, text, title, table, tableRow, tableCell, paragraph, section, combineComponents }
