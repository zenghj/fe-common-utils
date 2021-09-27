"use strict";
/**
 * 比较重的包不在此统一导出，强制单独导入，建议使用二级目录
 */
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
var assession_1 = require("./assession");
exports.assession = assession_1.default;
__export(require("./common"));
var enhanced_localstorage_1 = require("./enhanced-localstorage");
exports.StorageManager = enhanced_localstorage_1.default;
var global_task_registers_1 = require("./global-task-registers");
exports.doWhenScreenHidden = global_task_registers_1.doWhenScreenHidden;
exports.doWhenScreenVisible = global_task_registers_1.doWhenScreenVisible;
var json2formData_1 = require("./json2formData");
exports.json2formData = json2formData_1.default;
var network_1 = require("./network");
exports.isNetworkSlow = network_1.default;
var throttle_1 = require("./throttle");
exports.throttle = throttle_1.default;
var timeout_fn_1 = require("./timeout-fn");
exports.timeout = timeout_fn_1.default;
var types_1 = require("./types");
exports.Types = types_1.default;
var user_duration_manager_class_1 = require("./user-duration-manager-class");
exports.UserDurationLogManager = user_duration_manager_class_1.default;
var uuid_1 = require("./uuid");
exports.uuidGenerotor = uuid_1.default;
// console.warn('You have import total i5-common-utils, are you sure you are aware of it.')
