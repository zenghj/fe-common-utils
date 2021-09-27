"use strict";
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
Object.defineProperty(exports, "__esModule", { value: true });
var types_1 = require("./types");
/**
 * 便于管理localStorage
 * 1. 使用appName 指定app存localstorage时key的前缀，避免同一域名下部署的多个应用之间冲突的风险
 * 2. 提供版本管理，升级已经缓存数据的结构的能力
 * 3. localStorage.setItem|getItem 只能处理字符串，StorageManager可以处理能够被正常被JSON.stringify处理的类型
 */
var StorageManager = /** @class */ (function () {
    /**
     * @param {object} opt
     * @param @required {string} opt.appName 指定app存localstorage时key的前缀，避免多个应用冲突的情况
     * @param {number} opt.version
     * @param {array} opt.updaters 升级器列表
     *    @list {number} updater.version 升级器版本
     *    @list {function} updater.update 升级器逻辑，需要在本版本升级中进行的操作
     */
    function StorageManager(opt) {
        var e_1, _a;
        this.appName = opt.appName;
        this.version = opt.version; // 想要实例化的版本号，但和最后升级的storage结果不一定一致（升级失败时）
        this.updaters = opt.updaters || [];
        this.versionKey = 'storage_version';
        var currentVersion = this.getItem(this.versionKey);
        // 没有版本号，或者当前版本号小于需要创建的实例的版本号,说明需要升级版本号
        // TODO 在多个updater中反复读写storage不太好，初始化时升级所有数据是不是也不太好
        if ((!currentVersion || currentVersion < this.version) &&
            this.updaters.length && this.version) {
            var updatedVersion = currentVersion || 0;
            var updaters = this.updaters.sort(function (a, b) { return a.version - b.version; });
            try {
                try {
                    for (var updaters_1 = __values(updaters), updaters_1_1 = updaters_1.next(); !updaters_1_1.done; updaters_1_1 = updaters_1.next()) {
                        var updater = updaters_1_1.value;
                        if (updater.version > currentVersion) {
                            if (types_1.default.isFunction(updater.update)) {
                                updater.update.call(this, this);
                                updatedVersion = updater.version;
                                console.log("[update storage version to v_" + updater.version + "]");
                            }
                        }
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (updaters_1_1 && !updaters_1_1.done && (_a = updaters_1.return)) _a.call(updaters_1);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
            }
            catch (err) {
                console.error(err);
            }
            this.setItem(this.versionKey, updatedVersion);
        }
    }
    /**
     * 存
     * @param {string} key
     * @param {any} value 能够正确json化的任意类型
     */
    StorageManager.prototype.setItem = function (key, value) {
        try {
            localStorage.setItem(this.getRealKey(key), JSON.stringify(value));
        }
        catch (e) {
            console.warn(e);
        }
    };
    /**
     * 取
     * @param {string} key
     */
    StorageManager.prototype.getItem = function (key) {
        try {
            var data = localStorage.getItem(this.getRealKey(key));
            return data ? JSON.parse(data) : data;
        }
        catch (e) {
            console.warn(e);
            return null;
        }
    };
    /**
     * 删单个
     * @param {string} key
     */
    StorageManager.prototype.removeItem = function (key) {
        try {
            return localStorage.removeItem(this.getRealKey(key));
        }
        catch (e) {
            console.warn(e);
        }
    };
    /**
     * 删当前应用的所有缓存
     */
    StorageManager.prototype.clear = function () {
        try {
            var len = localStorage.length;
            for (var i = 0; i < len; i++) {
                var key = localStorage.key(i);
                if (key && key.startsWith && key.startsWith(this.appName + "_")) {
                    localStorage.removeItem(key);
                }
            }
        }
        catch (e) {
            console.warn(e);
        }
    };
    /**
     * 获取转化后的真实存储key, 仅内部使用
     * @param {string} rawKey
     */
    StorageManager.prototype.getRealKey = function (rawKey) {
        return this.appName + "_" + rawKey;
    };
    return StorageManager;
}());
exports.default = StorageManager;
