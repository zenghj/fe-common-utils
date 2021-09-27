/**
 * 比较重的包不在此统一导出，强制单独导入，建议使用二级目录
 */

export { default as assession} from './assession';
export * from './common';
export { default as StorageManager } from './enhanced-localstorage';
export { doWhenScreenHidden, doWhenScreenVisible } from './global-task-registers';
export { default as json2formData} from './json2formData';
export { default as isNetworkSlow } from './network';
export { default as throttle } from './throttle';
export { default as timeout } from './timeout-fn';
export { default as Types } from './types';
export { default as UserDurationLogManager } from './user-duration-manager-class';
export { default as uuidGenerotor } from './uuid';
export { default as memory } from './memory';
export { default as omit } from './omit';
export { default as Queue } from './queue';
export { timestamp2Date, formateDateStr, formateDuration } from './time';

// console.warn('You have import total i5-common-utils, are you sure you are aware of it.')
