import assession from './assession';
export default function memory(fn:Function) {
  assession(fn, 'Function')
  let result = null
  let hasMemory = false
  return function cacheableFn() {
    if (hasMemory) return result
    result = fn(...arguments)
    hasMemory = true
    return result
  }
}
