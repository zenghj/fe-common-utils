import assession from './assession'
import Types from './types'
/**
 * ajax请求时将参数由Json类型转成FormData类型
 */
export default function json2formData(obj) {
  assession(obj, 'Object')
  let formData = new FormData()
  Object.keys(obj).forEach(key => {
    let value = obj[key]
    if (Types.isObject(value) || Types.isArray(value)) {
      formData.set(key, JSON.stringify(value))
    } else {
      formData.set(key, value)
    }
  })
  return formData
}
