/**
 * 离开屏幕时执行任务cb
 * @param {function} cb
 * @return {function} clear函数，调用它可以去掉之前的注册cb任务
 */
export declare function doWhenScreenHidden(cb: any): () => boolean;
/**
 * 重新进入屏幕时执行任务cb
 * @param {function} cb
 * @return {function} clear函数，调用它可以去掉之前的注册cb任务，一般在组件销毁时调用
 */
export declare function doWhenScreenVisible(cb: any): () => boolean;
