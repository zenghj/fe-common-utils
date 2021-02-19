"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var objProto = Object.prototype;
function noop() { }
exports.noop = noop;
function hasOwn(obj, key) {
    return objProto.hasOwnProperty.call(obj, key);
}
exports.hasOwn = hasOwn;
