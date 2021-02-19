"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 *
 * @param fn
 * @param delay
 */
function throttle(fn, delay) {
    var now, lastExec, timer, context, args;
    var execute = function () {
        fn.apply(context, args);
        lastExec = now;
    };
    return function () {
        context = this;
        args = arguments;
        now = Date.now();
        if (timer) {
            clearTimeout(timer);
            timer = null;
        }
        if (lastExec) {
            var diff = delay - (now - lastExec);
            if (diff < 0) {
                execute();
            }
            else {
                timer = setTimeout(function () {
                    execute();
                }, diff);
            }
        }
        else {
            execute();
        }
    };
}
exports.default = throttle;
