"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var UserDurationLogManager = /** @class */ (function () {
    function UserDurationLogManager(options) {
        var _this = this;
        if (options === void 0) { options = {}; }
        this.lastTime = Date.now();
        this.name = options.name || '';
        this.options = options;
        this.logCacheKey = this.name + "_UserDurationLog";
        this.currentPage = '';
        // this will duplicate with visibilitychange
        // window.addEventListener('beforeunload', () => {
        //   let data = this.geneLogData()
        //   this.saveCache(data)
        //   this.log(data, () => {
        //     this.clearCache()
        //   })
        // })
        // if (__IS_SERVER__) return
        document.addEventListener('visibilitychange', function () {
            if (document.hidden) {
                var data = _this.geneLogData();
                _this.saveCache(data);
                // this.log(data, () => {
                //   console.log('hidden clearcache', data)
                //   this.clearCache() // maybe or maybe not execute
                // })
            }
            else {
                _this.dealCaches();
                _this.lastTime = Date.now();
            }
        });
        setTimeout(function () {
            _this.dealCaches();
        });
    }
    /**
     * must overide before instantiation
     */
    UserDurationLogManager.prototype.log = function (data, callback) {
        // console.warn('instance should invoke this.setLogFn to overide this.log')
    };
    /**
     * must overide before instantiation
     */
    UserDurationLogManager.prototype.geneLogData = function () {
        // console.warn(
        //   'instance should invoke this.setGeneLogDataFn to overide this.geneLogData'
        // )
    };
    UserDurationLogManager.prototype.getDuration = function () {
        return +((Date.now() - this.lastTime) / 1000 / 60).toFixed(4);
    };
    UserDurationLogManager.prototype.saveCache = function (data) {
        var cacheStr = localStorage.getItem(this.logCacheKey);
        var cacheItems = cacheStr ? JSON.parse(cacheStr) : [];
        cacheItems.push(data);
        localStorage.setItem(this.logCacheKey, JSON.stringify(cacheItems));
    };
    UserDurationLogManager.prototype.clearCache = function () {
        // __IS_CLIENT__ && console.log('clearCache')
        localStorage.setItem(this.logCacheKey, '');
    };
    UserDurationLogManager.prototype.dealCaches = function () {
        var _this = this;
        var caches = this.getCache();
        var hasCleared;
        if (caches) {
            var count_1 = caches.length;
            var cb_1 = function () {
                if (--count_1 <= 0) {
                    _this.clearCache();
                    hasCleared = true;
                }
            };
            caches.forEach(function (logData) {
                console.log('处理上一次的缓存数据', logData);
                _this.log(logData, cb_1);
            });
            var timeout = 3000;
            // __IS_CLIENT__ && 
            setTimeout(function () {
                if (!hasCleared) {
                    console.log('user duration timeout');
                    _this.clearCache();
                }
            }, timeout);
        }
    };
    UserDurationLogManager.prototype.getCache = function () {
        var cache = localStorage.getItem(this.logCacheKey);
        var cacheItems = cache ? JSON.parse(cache) : [];
        return cacheItems;
    };
    /**
     * 进入页面时调用，保存当前页面信息
     * @param {any} page 具体视你实现的数据收集上报而定
     */
    UserDurationLogManager.prototype.pageEnter = function (page) {
        this.currentPage = page;
        this.afterPageEnter();
    };
    /**
     * pageEnter之后的回调
     * override or not
     */
    UserDurationLogManager.prototype.afterPageEnter = function () { };
    /** pageLeave之前的回调
     * override or not
     */
    UserDurationLogManager.prototype.beforePageLeave = function () { };
    UserDurationLogManager.prototype.pageLeave = function () {
        this.beforePageLeave();
        this.log(this.geneLogData());
        this.lastTime = Date.now();
        this.currentPage = null;
    };
    UserDurationLogManager.prototype.forceUpdateLastTime = function (time) {
        this.lastTime = time || Date.now();
    };
    return UserDurationLogManager;
}());
exports.default = UserDurationLogManager;
