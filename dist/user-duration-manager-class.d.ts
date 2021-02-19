interface UserDurationLogManagerOption {
    name?: string;
}
declare class UserDurationLogManager {
    lastTime: number;
    name: string;
    options: UserDurationLogManagerOption;
    logCacheKey: string;
    currentPage: string;
    constructor(options?: UserDurationLogManagerOption);
    /**
     * must overide before instantiation
     */
    log(data: any, callback?: any): void;
    /**
     * must overide before instantiation
     */
    geneLogData(): void;
    getDuration(): number;
    saveCache(data: any): void;
    clearCache(): void;
    dealCaches(): void;
    getCache(): any;
    /**
     * 进入页面时调用，保存当前页面信息
     * @param {any} page 具体视你实现的数据收集上报而定
     */
    pageEnter(page: any): void;
    /**
     * pageEnter之后的回调
     * override or not
     */
    afterPageEnter(): void;
    /** pageLeave之前的回调
     * override or not
     */
    beforePageLeave(): void;
    pageLeave(): void;
    forceUpdateLastTime(time: any): void;
}
export default UserDurationLogManager;
