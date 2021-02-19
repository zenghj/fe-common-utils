/**
 * 延迟执行任务，防止一次性处理太多导致阻塞和页面卡顿
 * 目前主要用于不一次性同时发很多统计请求，不在服务端运行
 */
import { noop } from './common'
import Types from './types'
import assession from './assession'

interface TaskQueueoptions {
  delay?: number
}
interface TaskItem {
  task: Function;
  cb: Function;
}
class TaskQueue {
  options: TaskQueueoptions;
  tasks: TaskItem[];
  timer: any;
  /**
   * @param {object} options
   * @param {number} options.delay 任务队列中相邻任务执行的时间间隔，默认60ms
   */
  constructor(options:TaskQueueoptions = {}) {
    this.options = options
    this.tasks = []
    this.timer = null
    if (Types.isUndefined(options.delay)) {
      this.options.delay = 60
    }
  }
  /**
   * 添加任务
   * @param {function} task 放入队列的任务函数
   * @param {*} cb 任务执行之后的回调函数
   */
  enqueue(task, cb = noop) {
    assession(task, 'Function', 'task should be a function')
    let taskItem:TaskItem = { task, cb }
    this.tasks.push(taskItem)
    this.flushTask()
  }
  /**
   * 执行任务，仅内部调用
   * @param {object} param0
   * @param {function} param0.task
   * @param {function} param0.cb
   */
  do({ task, cb }) {
    try {
      task()
      cb()
    } catch (err) {
      console.error(err)
    }
  }
  /**
   * 冲洗队列中的任务
   */
  flushTask() {
    if (this.timer) return
    this.timer = setTimeout(() => {
      this.timer = null
      // console.log(this.tasks.length)
      if (this.tasks.length) {
        let taskItem = this.tasks.shift()
        this.do(taskItem)
        this.flushTask()
      }
    }, this.options.delay)
  }
}

export default new TaskQueue({
  delay: 200
})
