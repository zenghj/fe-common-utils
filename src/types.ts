type TypeFunction = (target: any) => boolean;
interface TypesUtil {
  [propName: string]: TypeFunction
}
const objProto = Object.prototype
const types = [
  'Object',
  'Array',
  'Function',
  'String',
  'Number',
  'Boolean',
  'Undefined',
  'Null',
  'Symbol'
]
const Types: TypesUtil = types.reduce((utilObj, type) => {
  utilObj[`is${type}`] = function(obj) {
    return objProto.toString.call(obj) === `[object ${type}]`
  }
  return utilObj
}, {})

export const supportedTypes = types.slice()

export default Types