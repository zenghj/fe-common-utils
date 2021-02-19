"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function timeout(asyncFn, delay, immediateWhenSync) {
    if (immediateWhenSync === void 0) { immediateWhenSync = true; }
    return new Promise(function (resolve, reject) {
        var promise = asyncFn();
        if (promise && promise.then) {
            promise.then(function (result) {
                resolve(result);
            }, function (err) {
                console.error(err);
                reject(err);
            });
        }
        else if (immediateWhenSync) {
            resolve(promise);
        }
        setTimeout(function () {
            reject(new Error('timeout'));
        }, delay);
    });
}
exports.default = timeout;
