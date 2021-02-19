/**
 * 神策JS SDK https://www.sensorsdata.cn/manual/js_sdk.html
 */
import { noop } from '../common'
import Types from '../types'
import taskQueue from '../task-queue'
const saPlugin = {
  inited: false,
  caches: [],
  cacheTimer: null,
  sa: null,
  init: ({ projectName, options = {}, commonProperties }) => {
    // if (__IS_SERVER__) {
    //   return Promise.resolve(saPlugin)
    // }
    return new Promise((resolve, reject) => {
      import(/* webpackChunkName: 'sa-sdk-javascript' */ 'sa-sdk-javascript').then(sa => {
        // 神策打点
        // if (__IS_CLIENT__) {
          window.sa = sa
        // }
        sa.init({
          server_url: `https://sa.api.intl.miui.com/sa?project=${projectName}`,
          web_url: `http://sa.dashboard.intl.miui.com/import/?project=${projectName}`,
          // show_log: true,
          show_log: false,
          name: 'sa',
          ...options
        })
        // 所有事件默认携带的公共属性
        if (Types.isObject(commonProperties)) {
          sa.registerPage(commonProperties)
        }
        sa.quick('autoTrack')
        saPlugin.inited = true
        saPlugin.sa = sa
        resolve(saPlugin)
      }).catch(err => {
        console.error(err)
        reject(err)
      })
    })
  },
  // 自定义事件
  // plugin必须实现
  track: function track(eventName, properties = {}, callback = noop) {
    // if (__IS_SERVER__) {
    //   return true
    // }
    if (!saPlugin.inited) {
      // throw new Error('saPlugin has not inited')
      const args = [].slice.call(arguments)
      saPlugin.caches.push(args)
      saPlugin.flushCache()
      return saPlugin.caches
    }
    // if (saPlugin.caches.length) {
    //   saPlugin.caches.forEach(trackArgs => {
    //     taskQueue.enqueue(() => {
    //       saPlugin.sa.track(...trackArgs)
    //     })
    //   })
    //   saPlugin.caches.length = 0
    // }
    saPlugin.sa.track(eventName, properties, callback)
  },
  flushCache() {
    if (saPlugin.caches.length && !saPlugin.cacheTimer) {
      saPlugin.cacheTimer = setInterval(() => {
        console.log('cacheTimer timing')
        if (saPlugin.caches.length && saPlugin.inited) {
          saPlugin.caches.forEach(trackArgs => {
            taskQueue.enqueue(() => {
              saPlugin.sa.track(...trackArgs)
            })
          })
          saPlugin.caches.length = 0
          clearInterval(saPlugin.cacheTimer)
          saPlugin.cacheTimer = null
        }
      }, 500)
    }
  },
  clearSdkPendingTimer() {
    if (saPlugin.cacheTimer) {
      clearInterval(saPlugin.cacheTimer)
    }
  }
}

window.addEventListener('unload', () => {
  saPlugin.clearSdkPendingTimer()
})
export default saPlugin
