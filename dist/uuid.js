"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * UUID函数生成器
 * @param {string} prefix 前缀
 */
function uuidGenerotor(prefix) {
    if (prefix === void 0) { prefix = ''; }
    var count = 0;
    return function uuid() {
        return prefix + (++count);
    };
}
exports.default = uuidGenerotor;
