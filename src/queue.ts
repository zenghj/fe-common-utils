import Types from './types';
export default class Queue {
  list: any[];
  constructor (list) {
    this.list = Types.isArray(list) ? list : []
  }
  enqueue (item) {
    if (this.list.indexOf(item) === -1) {
      this.list.push(item)
    }
  }
  dequeue () {
    let item = this.list.shift()
    return item
  }
  size () {
    return this.list.length
  }
  /**
   * 尾部原始
   */
  getTail () {
    if (this.size() > 0) {
      return this.list[this.size() - 1]
    }
  }
  getHead () {
    return this.list[0]
  }
}
