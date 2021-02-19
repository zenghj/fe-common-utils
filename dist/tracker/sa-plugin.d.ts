/**
 * 神策JS SDK https://www.sensorsdata.cn/manual/js_sdk.html
 */
import { noop } from '../common';
declare const saPlugin: {
    inited: boolean;
    caches: any[];
    cacheTimer: any;
    sa: any;
    init: ({ projectName, options, commonProperties }: {
        projectName: any;
        options?: {};
        commonProperties: any;
    }) => Promise<unknown>;
    track: (eventName: any, properties?: {}, callback?: typeof noop) => any[];
    flushCache(): void;
    clearSdkPendingTimer(): void;
};
export default saPlugin;
