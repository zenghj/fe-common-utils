"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 时间戳转换为Date对象
 * @param timestamp
 * @returns
 */
function timestamp2Date(timestamp) {
    return new Date(timestamp);
}
exports.timestamp2Date = timestamp2Date;
/**
 * 将个位数字用0补齐
 * @param {*} num
 */
function padding(num) {
    if (num < 10) {
        return "0" + num;
    }
    return num;
}
/**
 * 简版格式化时间
 * @param {Number | Date} timestamp
 * @param {String} format 形如 'YY/MM/DD hh:mm:ss'
 * @returns {String}
 */
function formateDateStr(timestamp, format) {
    if (format === void 0) { format = 'YY/MM/DD'; }
    if (timestamp == null)
        throw new Error('need param timestamp');
    var date = timestamp instanceof Date ? timestamp : timestamp2Date(timestamp);
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    var h = date.getHours();
    var m = date.getMinutes();
    var s = date.getSeconds();
    return format
        .replace('YY', '' + year)
        .replace('MM', '' + padding(month))
        .replace('DD', '' + padding(day))
        .replace('hh', '' + padding(h))
        .replace('mm', '' + padding(m))
        .replace('ss', '' + padding(s));
}
exports.formateDateStr = formateDateStr;
/**
 * 格式化时长
 * @param second
 * @returns
 */
function formateDuration(second) {
    var h = Math.floor(second / 3600);
    second = second % 3600;
    var m = Math.floor(second / 60);
    var s = second % 60;
    return (h > 0 ? h + ":" : '') + (padding(m) + ":") + ("" + padding(s));
}
exports.formateDuration = formateDuration;
