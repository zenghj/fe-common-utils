export default class Queue {
    list: any[];
    constructor(list: any);
    enqueue(item: any): void;
    dequeue(): any;
    size(): number;
    /**
     * 尾部原始
     */
    getTail(): any;
    getHead(): any;
}
