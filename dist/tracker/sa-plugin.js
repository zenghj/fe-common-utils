"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 神策JS SDK https://www.sensorsdata.cn/manual/js_sdk.html
 */
var common_1 = require("../common");
var types_1 = require("../types");
var task_queue_1 = require("../task-queue");
var saPlugin = {
    inited: false,
    caches: [],
    cacheTimer: null,
    sa: null,
    init: function (_a) {
        var projectName = _a.projectName, _b = _a.options, options = _b === void 0 ? {} : _b, commonProperties = _a.commonProperties;
        // if (__IS_SERVER__) {
        //   return Promise.resolve(saPlugin)
        // }
        return new Promise(function (resolve, reject) {
            Promise.resolve().then(function () { return require(/* webpackChunkName: 'sa-sdk-javascript' */ 'sa-sdk-javascript'); }).then(function (sa) {
                // 神策打点
                // if (__IS_CLIENT__) {
                window.sa = sa;
                // }
                sa.init(__assign({ server_url: "https://sa.api.intl.miui.com/sa?project=" + projectName, web_url: "http://sa.dashboard.intl.miui.com/import/?project=" + projectName, 
                    // show_log: true,
                    show_log: false, name: 'sa' }, options));
                // 所有事件默认携带的公共属性
                if (types_1.default.isObject(commonProperties)) {
                    sa.registerPage(commonProperties);
                }
                sa.quick('autoTrack');
                saPlugin.inited = true;
                saPlugin.sa = sa;
                resolve(saPlugin);
            }).catch(function (err) {
                console.error(err);
                reject(err);
            });
        });
    },
    // 自定义事件
    // plugin必须实现
    track: function track(eventName, properties, callback) {
        if (properties === void 0) { properties = {}; }
        if (callback === void 0) { callback = common_1.noop; }
        // if (__IS_SERVER__) {
        //   return true
        // }
        if (!saPlugin.inited) {
            // throw new Error('saPlugin has not inited')
            var args = [].slice.call(arguments);
            saPlugin.caches.push(args);
            saPlugin.flushCache();
            return saPlugin.caches;
        }
        // if (saPlugin.caches.length) {
        //   saPlugin.caches.forEach(trackArgs => {
        //     taskQueue.enqueue(() => {
        //       saPlugin.sa.track(...trackArgs)
        //     })
        //   })
        //   saPlugin.caches.length = 0
        // }
        saPlugin.sa.track(eventName, properties, callback);
    },
    flushCache: function () {
        if (saPlugin.caches.length && !saPlugin.cacheTimer) {
            saPlugin.cacheTimer = setInterval(function () {
                console.log('cacheTimer timing');
                if (saPlugin.caches.length && saPlugin.inited) {
                    saPlugin.caches.forEach(function (trackArgs) {
                        task_queue_1.default.enqueue(function () {
                            var _a;
                            (_a = saPlugin.sa).track.apply(_a, __spread(trackArgs));
                        });
                    });
                    saPlugin.caches.length = 0;
                    clearInterval(saPlugin.cacheTimer);
                    saPlugin.cacheTimer = null;
                }
            }, 500);
        }
    },
    clearSdkPendingTimer: function () {
        if (saPlugin.cacheTimer) {
            clearInterval(saPlugin.cacheTimer);
        }
    }
};
window.addEventListener('unload', function () {
    saPlugin.clearSdkPendingTimer();
});
exports.default = saPlugin;
