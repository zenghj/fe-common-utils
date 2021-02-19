"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 延迟执行任务，防止一次性处理太多导致阻塞和页面卡顿
 * 目前主要用于不一次性同时发很多统计请求，不在服务端运行
 */
var common_1 = require("./common");
var types_1 = require("./types");
var assession_1 = require("./assession");
var TaskQueue = /** @class */ (function () {
    /**
     * @param {object} options
     * @param {number} options.delay 任务队列中相邻任务执行的时间间隔，默认60ms
     */
    function TaskQueue(options) {
        if (options === void 0) { options = {}; }
        this.options = options;
        this.tasks = [];
        this.timer = null;
        if (types_1.default.isUndefined(options.delay)) {
            this.options.delay = 60;
        }
    }
    /**
     * 添加任务
     * @param {function} task 放入队列的任务函数
     * @param {*} cb 任务执行之后的回调函数
     */
    TaskQueue.prototype.enqueue = function (task, cb) {
        if (cb === void 0) { cb = common_1.noop; }
        assession_1.default(task, 'Function', 'task should be a function');
        var taskItem = { task: task, cb: cb };
        this.tasks.push(taskItem);
        this.flushTask();
    };
    /**
     * 执行任务，仅内部调用
     * @param {object} param0
     * @param {function} param0.task
     * @param {function} param0.cb
     */
    TaskQueue.prototype.do = function (_a) {
        var task = _a.task, cb = _a.cb;
        try {
            task();
            cb();
        }
        catch (err) {
            console.error(err);
        }
    };
    /**
     * 冲洗队列中的任务
     */
    TaskQueue.prototype.flushTask = function () {
        var _this = this;
        if (this.timer)
            return;
        this.timer = setTimeout(function () {
            _this.timer = null;
            // console.log(this.tasks.length)
            if (_this.tasks.length) {
                var taskItem = _this.tasks.shift();
                _this.do(taskItem);
                _this.flushTask();
            }
        }, this.options.delay);
    };
    return TaskQueue;
}());
exports.default = new TaskQueue({
    delay: 200
});
