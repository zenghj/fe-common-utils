"use strict";
/**
 * 获取手机设备信息，开发环境和沙盒环境使用模拟信息
 */
Object.defineProperty(exports, "__esModule", { value: true });
var mockInfo = {
    'language': 'en-rIN',
    'region': 'none',
    'device': 'mido',
    'model': 'Redmi Note 4',
    'product': 'mido',
    'version_release': '7.0',
    'version_incremental': '8.12.19',
    'version_name': '10.4.3-g',
    'version_code': 20190128,
    'package_name': 'com.android.browser',
    'isTablet': false,
    'platform': 'ARM',
    'stable': 'dev',
    'screen_width': '1080',
    'screen_height': '1920',
    'screen_density': '480',
    'carrier': 'unknown',
    'operator': 'unknown',
    'device_hash': '45e89d33-6bb6-4fb7-958f-102f084b3955',
    'gaid': '5fc23e37-6c4e-4258-8fe2-f005b31c202b',
    'android_id': 'b8d094fae43080c3',
    'nt': 'WIFI',
    'snt': '',
    'isMocked': true // 标记是mock数据
};
/**
 * @param fallback 不存在miui信息时是否回退mock数据
 */
var getDeviceInfo = function (fallback) {
    // if (__IS_SERVER__) {
    //   return mockInfo
    // }
    if (getDeviceInfo.__INFO__)
        return getDeviceInfo.__INFO__;
    var info;
    try {
        // 在小米浏览器中访问的页面都能访问到window.miui，
        // 但是非miui.com结尾的域名下的界面执行window.miui.getDeviceInfo 会报java错误
        if (!window.miui) {
            throw new Error('cannot get window.miui out box of Mi browser, fallback to mock deviceInfo');
        }
        info = JSON.parse(window.miui.getDeviceInfo());
        getDeviceInfo.__INFO__ = info;
    }
    catch (err) {
        console.warn(err);
        if (fallback) {
            getDeviceInfo.__INFO__ = info = mockInfo;
        }
    }
    return getDeviceInfo.__INFO__ || mockInfo;
};
exports.default = getDeviceInfo;
