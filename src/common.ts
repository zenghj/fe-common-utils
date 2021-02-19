const objProto = Object.prototype
export function noop() {}

export function hasOwn(obj, key) {
  return objProto.hasOwnProperty.call(obj, key)
}
