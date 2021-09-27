"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Validator = /** @class */ (function () {
    function Validator() {
    }
    Validator.isEmpty = function (str) {
        if (str === void 0) { str = ''; }
        return !str || str.trim() === '';
    };
    return Validator;
}());
exports.Validator = Validator;
var ValidateResult = /** @class */ (function () {
    function ValidateResult(_a) {
        var msg = _a.msg, valid = _a.valid;
        this.msg = msg;
        this.valid = valid;
    }
    ValidateResult.prototype.isValid = function () {
        return this.valid;
    };
    ValidateResult.prototype.getMsg = function () {
        return this.msg;
    };
    return ValidateResult;
}());
exports.ValidateResult = ValidateResult;
var ValidateError = /** @class */ (function (_super) {
    __extends(ValidateError, _super);
    function ValidateError(msg) {
        if (msg === void 0) { msg = 'invalid value'; }
        return _super.call(this, {
            msg: msg,
            valid: false
        }) || this;
    }
    return ValidateError;
}(ValidateResult));
exports.ValidateError = ValidateError;
var ValidateSuccess = /** @class */ (function (_super) {
    __extends(ValidateSuccess, _super);
    function ValidateSuccess() {
        return _super.call(this, {
            msg: '',
            valid: true
        }) || this;
    }
    return ValidateSuccess;
}(ValidateResult));
exports.ValidateSuccess = ValidateSuccess;
