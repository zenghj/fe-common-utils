/**
 * 时间戳转换为Date对象
 * @param timestamp
 * @returns
 */
export declare function timestamp2Date(timestamp: number): Date;
/**
 * 简版格式化时间
 * @param {Number | Date} timestamp
 * @param {String} format 形如 'YY/MM/DD hh:mm:ss'
 * @returns {String}
 */
export declare function formateDateStr(timestamp: number | Date, format?: string): string;
/**
 * 格式化时长
 * @param second
 * @returns
 */
export declare function formateDuration(second: any): string;
