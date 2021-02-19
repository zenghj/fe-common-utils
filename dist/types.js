"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var objProto = Object.prototype;
var types = [
    'Object',
    'Array',
    'Function',
    'String',
    'Number',
    'Boolean',
    'Undefined',
    'Null',
    'Symbol'
];
var Types = types.reduce(function (utilObj, type) {
    utilObj["is" + type] = function (obj) {
        return objProto.toString.call(obj) === "[object " + type + "]";
    };
    return utilObj;
}, {});
exports.supportedTypes = types.slice();
exports.default = Types;
