/**
 * 延迟执行任务，防止一次性处理太多导致阻塞和页面卡顿
 * 目前主要用于不一次性同时发很多统计请求，不在服务端运行
 */
import { noop } from './common';
interface TaskQueueoptions {
    delay?: number;
}
interface TaskItem {
    task: Function;
    cb: Function;
}
declare class TaskQueue {
    options: TaskQueueoptions;
    tasks: TaskItem[];
    timer: any;
    /**
     * @param {object} options
     * @param {number} options.delay 任务队列中相邻任务执行的时间间隔，默认60ms
     */
    constructor(options?: TaskQueueoptions);
    /**
     * 添加任务
     * @param {function} task 放入队列的任务函数
     * @param {*} cb 任务执行之后的回调函数
     */
    enqueue(task: any, cb?: typeof noop): void;
    /**
     * 执行任务，仅内部调用
     * @param {object} param0
     * @param {function} param0.task
     * @param {function} param0.cb
     */
    do({ task, cb }: {
        task: any;
        cb: any;
    }): void;
    /**
     * 冲洗队列中的任务
     */
    flushTask(): void;
}
declare const _default: TaskQueue;
export default _default;
