interface UserDurationLogManagerOption {
  name?: string;
}

class UserDurationLogManager {
  lastTime: number;
  name: string;
  options: UserDurationLogManagerOption;
  logCacheKey: string;
  currentPage: string;

  constructor(options:UserDurationLogManagerOption = {}) {
    this.lastTime = Date.now()
    this.name = options.name || ''
    this.options = options
    this.logCacheKey = `${this.name}_UserDurationLog`
    this.currentPage = ''

    // this will duplicate with visibilitychange
    // window.addEventListener('beforeunload', () => {
    //   let data = this.geneLogData()
    //   this.saveCache(data)
    //   this.log(data, () => {
    //     this.clearCache()
    //   })
    // })

    // if (__IS_SERVER__) return
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        let data = this.geneLogData()
        this.saveCache(data)
        // this.log(data, () => {
        //   console.log('hidden clearcache', data)
        //   this.clearCache() // maybe or maybe not execute
        // })
      } else {
        this.dealCaches()
        this.lastTime = Date.now()
      }
    })

    setTimeout(() => {
      this.dealCaches()
    })
  }
  /**
   * must overide before instantiation
   */
  log(data, callback?) {
    // console.warn('instance should invoke this.setLogFn to overide this.log')
  }
  /**
   * must overide before instantiation
   */
  geneLogData() {
    // console.warn(
    //   'instance should invoke this.setGeneLogDataFn to overide this.geneLogData'
    // )
  }
  getDuration() {
    return +((Date.now() - this.lastTime) / 1000 / 60).toFixed(4)
  }
  saveCache(data) {
    let cacheStr = localStorage.getItem(this.logCacheKey)
    let cacheItems = cacheStr ? JSON.parse(cacheStr) : []
    cacheItems.push(data)
    localStorage.setItem(this.logCacheKey, JSON.stringify(cacheItems))
  }
  clearCache() {
    // __IS_CLIENT__ && console.log('clearCache')
    localStorage.setItem(this.logCacheKey, '')
  }
  dealCaches() {
    let caches = this.getCache()
    let hasCleared
    if (caches) {
      let count = caches.length
      const cb = () => {
        if (--count <= 0) {
          this.clearCache()
          hasCleared = true
        }
      }
      caches.forEach(logData => {
        console.log('处理上一次的缓存数据', logData)
        this.log(logData, cb)
      })

      const timeout = 3000
      // __IS_CLIENT__ && 
      setTimeout(() => {
        if (!hasCleared) {
          console.log('user duration timeout')
          this.clearCache()
        }
      }, timeout)
    }
  }
  getCache() {
    let cache = localStorage.getItem(this.logCacheKey)
    let cacheItems = cache ? JSON.parse(cache) : []
    return cacheItems
  }

  /**
   * 进入页面时调用，保存当前页面信息
   * @param {any} page 具体视你实现的数据收集上报而定
   */
  pageEnter(page) {
    this.currentPage = page
    this.afterPageEnter()
  }
  /**
   * pageEnter之后的回调
   * override or not
   */
  afterPageEnter() {}
  /** pageLeave之前的回调
   * override or not
   */
  beforePageLeave() {}
  pageLeave() {
    this.beforePageLeave()
    this.log(this.geneLogData())
    this.lastTime = Date.now()
    this.currentPage = null
  }
  forceUpdateLastTime(time) {
    this.lastTime = time || Date.now()
  }
}

export default UserDurationLogManager
