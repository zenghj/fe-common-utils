"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var types_1 = require("./types");
var Queue = /** @class */ (function () {
    function Queue(list) {
        this.list = types_1.default.isArray(list) ? list : [];
    }
    Queue.prototype.enqueue = function (item) {
        if (this.list.indexOf(item) === -1) {
            this.list.push(item);
        }
    };
    Queue.prototype.dequeue = function () {
        var item = this.list.shift();
        return item;
    };
    Queue.prototype.size = function () {
        return this.list.length;
    };
    /**
     * 尾部原始
     */
    Queue.prototype.getTail = function () {
        if (this.size() > 0) {
            return this.list[this.size() - 1];
        }
    };
    Queue.prototype.getHead = function () {
        return this.list[0];
    };
    return Queue;
}());
exports.default = Queue;
