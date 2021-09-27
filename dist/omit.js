"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var types_1 = require("./types");
function omit(obj, keys) {
    if (keys === void 0) { keys = []; }
    if (!types_1.default.isObject(obj)) {
        return obj;
    }
    var result = {};
    Object.keys(obj).forEach(function (key) {
        if (keys.indexOf(key) === -1) {
            result[key] = obj[key];
        }
    });
    return result;
}
exports.default = omit;
