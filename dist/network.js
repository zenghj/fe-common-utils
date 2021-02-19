"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 判断是否处于2g网络差环境
 */
function isNetworkSlow() {
    var connection = window.navigator['connection'];
    var effectiveType = '';
    connection && (effectiveType = connection.effectiveType || '');
    return effectiveType.indexOf('2g') > -1;
}
exports.default = isNetworkSlow;
