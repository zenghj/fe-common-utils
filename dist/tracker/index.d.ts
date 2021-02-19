import { noop } from '../common';
interface TrackerPlugin {
    track: Function;
}
declare class Tracker {
    options: Object;
    plugins: TrackerPlugin[];
    constructor(options?: any);
    track(eventName: any, properties?: {}, callback?: typeof noop): void;
    applyPlugin(plugin: any): void;
}
declare const _default: Tracker;
export default _default;
