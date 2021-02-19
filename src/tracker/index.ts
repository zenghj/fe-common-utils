import { noop } from '../common'
import Types from '../types'
import assession from '../assession'

interface TrackerPlugin {
  track: Function
}

class Tracker {
  options: Object;
  plugins: TrackerPlugin[];
  
  constructor(options?) {
    this.options = options || {}
    this.plugins = []
  }
  track(eventName, properties = {}, callback = noop) {
    if (!this.plugins || this.plugins.length === 0) {
      throw new Error('must register at least one plugin')
    }
    assession(callback, 'Function')
    let args = [...arguments]
    let count = this.plugins.length
    args[2] = function cb() {
      if (--count === 0) {
        callback() // 所有plugin都完成才执行callback
      }
    }
    this.plugins.forEach(plugin => {
      plugin.track.apply(this, args)
    })
  }
  applyPlugin(plugin) {
    this.plugins = this.plugins || []
    let plugins = Types.isArray(plugin) ? plugin : [plugin]
    plugins.forEach(item => {
      if (this.plugins.indexOf(item) === -1) {
        this.plugins.push(item)
      }
    })
  }
}

export default new Tracker()
