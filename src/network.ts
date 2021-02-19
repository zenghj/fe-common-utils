/**
 * 判断是否处于2g网络差环境
 */
export default function isNetworkSlow() {
  const connection = window.navigator['connection']
  let effectiveType = ''
  connection && (effectiveType = connection.effectiveType || '')
  return effectiveType.indexOf('2g') > -1
}
