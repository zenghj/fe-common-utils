"use strict";
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
var common_1 = require("../common");
var types_1 = require("../types");
var assession_1 = require("../assession");
var Tracker = /** @class */ (function () {
    function Tracker(options) {
        this.options = options || {};
        this.plugins = [];
    }
    Tracker.prototype.track = function (eventName, properties, callback) {
        var _this = this;
        if (properties === void 0) { properties = {}; }
        if (callback === void 0) { callback = common_1.noop; }
        if (!this.plugins || this.plugins.length === 0) {
            throw new Error('must register at least one plugin');
        }
        assession_1.default(callback, 'Function');
        var args = __spread(arguments);
        var count = this.plugins.length;
        args[2] = function cb() {
            if (--count === 0) {
                callback(); // 所有plugin都完成才执行callback
            }
        };
        this.plugins.forEach(function (plugin) {
            plugin.track.apply(_this, args);
        });
    };
    Tracker.prototype.applyPlugin = function (plugin) {
        var _this = this;
        this.plugins = this.plugins || [];
        var plugins = types_1.default.isArray(plugin) ? plugin : [plugin];
        plugins.forEach(function (item) {
            if (_this.plugins.indexOf(item) === -1) {
                _this.plugins.push(item);
            }
        });
    };
    return Tracker;
}());
exports.default = new Tracker();
