"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var assession_1 = require("./assession");
var screenHiddenCbs = [];
var screenVisibleCbs = [];
document.addEventListener('visibilitychange', function () {
    if (document.hidden) {
        screenHiddenCbs.forEach(function (cb) {
            assession_1.default(cb, 'Function');
            cb();
        });
    }
    else {
        screenVisibleCbs.forEach(function (cb) {
            assession_1.default(cb, 'Function');
            cb();
        });
    }
});
/**
 * 生成clear清除函数，清除注册的cb任务
 * @param {array} callbacks 存储cb的数组
 * @param {function} cb cb任务
 */
function geneClearCallbackFn(callbacks, cb) {
    return function clearCallback() {
        var index = callbacks.indexOf(cb);
        if (index > -1) {
            callbacks.splice(index, 1);
            return true;
        }
    };
}
/**
 * 离开屏幕时执行任务cb
 * @param {function} cb
 * @return {function} clear函数，调用它可以去掉之前的注册cb任务
 */
function doWhenScreenHidden(cb) {
    if (screenHiddenCbs.indexOf(cb) === -1) {
        screenHiddenCbs.push(cb);
    }
    return geneClearCallbackFn(screenHiddenCbs, cb);
}
exports.doWhenScreenHidden = doWhenScreenHidden;
/**
 * 重新进入屏幕时执行任务cb
 * @param {function} cb
 * @return {function} clear函数，调用它可以去掉之前的注册cb任务，一般在组件销毁时调用
 */
function doWhenScreenVisible(cb) {
    if (screenVisibleCbs.indexOf(cb) === -1) {
        screenVisibleCbs.push(cb);
    }
    return geneClearCallbackFn(screenVisibleCbs, cb);
}
exports.doWhenScreenVisible = doWhenScreenVisible;
