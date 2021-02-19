export class Validator {
  static isEmpty (str = '') {
    return !str || str.trim() === ''
  }
}

export class ValidateResult {
  constructor ({ msg, valid }) {
    this.msg = msg
    this.valid = valid
  }
  isValid () {
    return this.valid
  }
  getMsg () {
    return this.msg
  }
}

export class ValidateError extends ValidateResult {
  constructor (msg = 'invalid value') {
    super({
      msg,
      valid: false
    })
  }
}

export class ValidateSuccess extends ValidateResult {
  constructor () {
    super({
      msg: '',
      valid: true
    })
  }
}
