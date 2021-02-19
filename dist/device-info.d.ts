/**
 * 获取手机设备信息，开发环境和沙盒环境使用模拟信息
 */
interface DeviceInfo {
    isMocked: boolean;
    device_hash: string;
    region: string;
    language: string;
    package_name: string;
    gaid: string;
}
interface GetDeviceInfo {
    (fallback?: boolean): DeviceInfo;
    __INFO__?: DeviceInfo;
}
/**
 * @param fallback 不存在miui信息时是否回退mock数据
 */
declare const getDeviceInfo: GetDeviceInfo;
export default getDeviceInfo;
