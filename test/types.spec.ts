import {default as Types, supportedTypes} from '../src/types'

function isFunction(func) {
  return typeof func === 'function'
}
test('types.spec.ts supportedTypes', () => {
  supportedTypes.forEach(type => {
    expect(isFunction(Types[`is${type}`])).toBe(true)
  })
})

test('types.spec.ts Types.isObject', () => {
  expect(Types.isObject(null)).toBe(false)
  expect(Types.isObject({})).toBe(true)
  expect(Types.isObject(1)).toBe(false)
})

test('types.spec.ts Types.isArray', () => {
  expect(Types.isArray(null)).toBe(false)
  expect(Types.isArray([])).toBe(true)
  expect(Types.isArray('123')).toBe(false)
})

test('types.spec.ts Types.isFunction', () => {
  expect(Types.isFunction(null)).toBe(false)
  expect(Types.isFunction(function() {})).toBe(true)
  expect(Types.isFunction('123')).toBe(false)
})

test('types.spec.ts Types.isString', () => {
  expect(Types.isString(null)).toBe(false)
  expect(Types.isString('')).toBe(true)
  expect(Types.isString(1)).toBe(false)
})

test('types.spec.ts Types.isNumber', () => {
  expect(Types.isNumber(null)).toBe(false)
  expect(Types.isNumber(1)).toBe(true)
  expect(Types.isNumber(NaN)).toBe(true) // 排除？？
  expect(Types.isNumber('')).toBe(false)
})

test('types.spec.ts Types.isBoolean', () => {
  expect(Types.isBoolean(null)).toBe(false)
  expect(Types.isBoolean(false)).toBe(true)
  expect(Types.isBoolean(true)).toBe(true)
  expect(Types.isBoolean(Boolean(true))).toBe(true) // 排除？？
  expect(Types.isBoolean(1)).toBe(false)
})

test('types.spec.ts Types.isUndefined', () => {
  expect(Types.isUndefined(null)).toBe(false)
  expect(Types.isUndefined(undefined)).toBe(true)
  expect(Types.isUndefined(1)).toBe(false)
})

test('types.spec.ts Types.isNull', () => {
  expect(Types.isNull(null)).toBe(true)
  expect(Types.isNull(undefined)).toBe(false)
  expect(Types.isNull({})).toBe(false)
})

test('types.spec.ts Types.isSymbol', () => {
  expect(Types.isSymbol(null)).toBe(false)
  expect(Types.isSymbol(Symbol('x'))).toBe(true)
  expect(Types.isSymbol({})).toBe(false)
})