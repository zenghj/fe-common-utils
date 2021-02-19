/**
 * UUID函数生成器
 * @param {string} prefix 前缀
 */
export default function uuidGenerotor(prefix = '') {
  let count = 0
  return function uuid() {
    return prefix + (++count)
  }
}
