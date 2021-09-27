import Types from './types';
export default function omit(obj:Record<string, any>, keys:String[] = []) {
  if (!Types.isObject(obj)) {
    return obj;
  }
  const result = {};
  Object.keys(obj).forEach(key => {
    if (keys.indexOf(key) === -1) {
      result[key] = obj[key];
    }
  });
  return result;
}