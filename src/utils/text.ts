export function cleanArticleHtml(html: string) {
   return html
      .replace(/&nbsp;/g, " ") // replace non-breaking spaces
      .replace(/<p>\s*<\/p>/g, "") // remove empty paragraphs
      .trim();
}
