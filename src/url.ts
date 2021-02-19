import Types from './types'
export function encodeQuery(query = {}) {
  return Object.keys(query).reduce((sum, key, idx) => {
    let value = query[key]
    if (Types.isObject(value) || Types.isArray(value)) {
      value = JSON.stringify(value)
    }
    return (
      sum + (idx > 0 ? '&' : '') + key + '=' + encodeURIComponent(value)
    )
  }, '')
}

/**
 *  解析形如?x=1的search字符串 (window.location.search)
 * @param search
 */
export function parseSearch(search:string) {
  try {
    var params = {}
    var paramItem
    if (search && search.slice) {
      search = search.slice(1) || ''
      var searches = search.split('&')
      for (var i = 0; i < searches.length; i++) {
        paramItem = searches[i] || ''
        paramItem = paramItem.split('=')
        if (paramItem[0]) {
          params[paramItem[0]] = decodeURIComponent(paramItem[1] || '')
        }
      }
      return params
    } else {
      return {}
    }
  } catch (err) {
    console.error(err)
    return {}
  }
}
