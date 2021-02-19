import Types from './types'

interface EnhancedLocalstorage {
  clear: Function
}
interface EnhancedLocalstorageUpdater {
  version: number;
  update: (self: EnhancedLocalstorage ) => any;
}
/**
 * 便于管理localStorage
 * 1. 使用appName 指定app存localstorage时key的前缀，避免同一域名下部署的多个应用之间冲突的风险
 * 2. 提供版本管理，升级已经缓存数据的结构的能力
 * 3. localStorage.setItem|getItem 只能处理字符串，StorageManager可以处理能够被正常被JSON.stringify处理的类型
 */
export default class StorageManager {
  appName:string;
  version:number;
  updaters:EnhancedLocalstorageUpdater[];
  versionKey:string;

  /**
   * @param {object} opt
   * @param @required {string} opt.appName 指定app存localstorage时key的前缀，避免多个应用冲突的情况
   * @param {number} opt.version
   * @param {array} opt.updaters 升级器列表
   *    @list {number} updater.version 升级器版本
   *    @list {function} updater.update 升级器逻辑，需要在本版本升级中进行的操作
   */
  constructor(opt) {
    this.appName = opt.appName
    this.version = opt.version // 想要实例化的版本号，但和最后升级的storage结果不一定一致（升级失败时）
    this.updaters = opt.updaters || []
    this.versionKey = 'storage_version'
    const currentVersion = this.getItem(this.versionKey)
    // 没有版本号，或者当前版本号小于需要创建的实例的版本号,说明需要升级版本号
    // TODO 在多个updater中反复读写storage不太好，初始化时升级所有数据是不是也不太好
    if ((!currentVersion || currentVersion < this.version) &&
      this.updaters.length && this.version) {
      let updatedVersion = currentVersion || 0
      const updaters = this.updaters.sort((a, b) => a.version - b.version)
      try {
        for (const updater of updaters) {
          if (updater.version > currentVersion) {
            if (Types.isFunction(updater.update)) {
              updater.update.call(this, this)
              updatedVersion = updater.version
              console.log(`[update storage version to v_${updater.version}]`)
            }
          }
        }
      } catch (err) {
        console.error(err)
      }
      this.setItem(this.versionKey, updatedVersion)
    }
  }
  /**
   * 存
   * @param {string} key
   * @param {any} value 能够正确json化的任意类型
   */
  setItem(key, value) {
    localStorage.setItem(this.getRealKey(key), JSON.stringify(value))
  }
  /**
   * 取
   * @param {string} key
   */
  getItem(key) {
    let data = localStorage.getItem(this.getRealKey(key))
    return data ? JSON.parse(data) : data
  }
  /**
   * 删单个
   * @param {string} key
   */
  removeItem(key) {
    return localStorage.removeItem(this.getRealKey(key))
  }
  /**
   * 删当前应用的所有缓存
   */
  clear() {
    let len = localStorage.length
    for (let i = 0; i < len; i++) {
      let key:string = localStorage.key(i)
      if (key && key.startsWith && key.startsWith(`${this.appName}_`)) {
        localStorage.removeItem(key)
      }
    }
  }
  /**
   * 获取转化后的真实存储key, 仅内部使用
   * @param {string} rawKey
   */
  getRealKey(rawKey) { // 同一域名部署了太多应用，防止冲突
    return `${this.appName}_${rawKey}`
  }
}
