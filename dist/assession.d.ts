/**
 * assession
 */
/**
 * 鉴定参数类型是否合法，否则报错
 * @param {any} obj 被检测的目标
 * @param {string | function} type 被检测的目标的类型（String|Function）
 *    内置支持的类型String有：'Object'|'Array'|'Function'|'String'|'Number'|'Boolean'|'Undefined'|'Null'|'Symbol'
 * @param {string} msg 错误时抛出的错误信息
 */
export default function assession(obj: any, type: any, msg?: string): void;
