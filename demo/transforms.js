module.exports = {

  law_lists(md, param, ops) {
    return ('\n'+md)
      .replace(/\n\(i\)\s*/g, '\n - ')
      .replace(/\n\s*\((i|ii|iii|iv|v|vi)\)\s*/g, '\n1. ')
      .replace(/\n\s*\([1-9]\)\s*/g, '\n1. ')
      .replace(/\n\s*\([a-z]\)\s*/g, '\n - ')
  },

  li_counter_set(html, param, ops) {
    return html
  }

}
