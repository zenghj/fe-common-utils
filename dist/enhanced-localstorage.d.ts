interface EnhancedLocalstorage {
    clear: Function;
}
interface EnhancedLocalstorageUpdater {
    version: number;
    update: (self: EnhancedLocalstorage) => any;
}
/**
 * 便于管理localStorage
 * 1. 使用appName 指定app存localstorage时key的前缀，避免同一域名下部署的多个应用之间冲突的风险
 * 2. 提供版本管理，升级已经缓存数据的结构的能力
 * 3. localStorage.setItem|getItem 只能处理字符串，StorageManager可以处理能够被正常被JSON.stringify处理的类型
 */
export default class StorageManager {
    appName: string;
    version: number;
    updaters: EnhancedLocalstorageUpdater[];
    versionKey: string;
    /**
     * @param {object} opt
     * @param @required {string} opt.appName 指定app存localstorage时key的前缀，避免多个应用冲突的情况
     * @param {number} opt.version
     * @param {array} opt.updaters 升级器列表
     *    @list {number} updater.version 升级器版本
     *    @list {function} updater.update 升级器逻辑，需要在本版本升级中进行的操作
     */
    constructor(opt: any);
    /**
     * 存
     * @param {string} key
     * @param {any} value 能够正确json化的任意类型
     */
    setItem(key: any, value: any): void;
    /**
     * 取
     * @param {string} key
     */
    getItem(key: any): any;
    /**
     * 删单个
     * @param {string} key
     */
    removeItem(key: any): void;
    /**
     * 删当前应用的所有缓存
     */
    clear(): void;
    /**
     * 获取转化后的真实存储key, 仅内部使用
     * @param {string} rawKey
     */
    getRealKey(rawKey: any): string;
}
export {};
