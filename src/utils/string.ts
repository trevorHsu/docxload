function toCamelCase(str: string) {
  const list = (str || '').split('-')

  return list.slice(1).reduce((prev, cur) => {
    cur = cur && (cur[0].toUpperCase() + cur.substring(1))
    return prev + cur
  }, list[0])
}

export { toCamelCase }
