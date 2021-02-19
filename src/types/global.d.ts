declare global {
  interface Array<T> {
    naturalSort: () => Array<T>
  }
  interface Window {
    miui?: MIUIBridge;
    sa?: Object;
  }
}

export interface MIUIBridge {
  getDeviceInfo: () => string;
}