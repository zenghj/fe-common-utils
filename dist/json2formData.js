"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var assession_1 = require("./assession");
var types_1 = require("./types");
/**
 * ajax请求时将参数由Json类型转成FormData类型
 */
function json2formData(obj) {
    assession_1.default(obj, 'Object');
    var formData = new FormData();
    Object.keys(obj).forEach(function (key) {
        var value = obj[key];
        if (types_1.default.isObject(value) || types_1.default.isArray(value)) {
            formData.set(key, JSON.stringify(value));
        }
        else {
            formData.set(key, value);
        }
    });
    return formData;
}
exports.default = json2formData;
