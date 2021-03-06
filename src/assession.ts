/**
 * assession
 */

import Types from './types'

/**
 * 鉴定参数类型是否合法，否则报错
 * @param {any} obj 被检测的目标
 * @param {string | function} type 被检测的目标的类型（String|Function）
 *    内置支持的类型String有：'Object'|'Array'|'Function'|'String'|'Number'|'Boolean'|'Undefined'|'Null'|'Symbol'
 * @param {string} msg 错误时抛出的错误信息
 */
export default function assession(obj, type, msg = 'Error') {
  let typeFn = Types[`is${type}`]
  if (Types.isFunction(typeFn)) {
    if (!typeFn(obj)) {
      throw new Error(msg)
    }
  } else if (Types.isFunction(type)) {
    if (!type(obj)) {
      throw new Error(msg)
    }
  } else {
    throw new Error('assession argument illegal')
  }
}
