"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var types_1 = require("./types");
function encodeQuery(query) {
    if (query === void 0) { query = {}; }
    return Object.keys(query).reduce(function (sum, key, idx) {
        var value = query[key];
        if (types_1.default.isObject(value) || types_1.default.isArray(value)) {
            value = JSON.stringify(value);
        }
        return (sum + (idx > 0 ? '&' : '') + key + '=' + encodeURIComponent(value));
    }, '');
}
exports.encodeQuery = encodeQuery;
/**
 *  解析形如?x=1的search字符串 (window.location.search)
 * @param search
 */
function parseSearch(search) {
    try {
        var params = {};
        var paramItem;
        if (search && search.slice) {
            search = search.slice(1) || '';
            var searches = search.split('&');
            for (var i = 0; i < searches.length; i++) {
                paramItem = searches[i] || '';
                paramItem = paramItem.split('=');
                if (paramItem[0]) {
                    params[paramItem[0]] = decodeURIComponent(paramItem[1] || '');
                }
            }
            return params;
        }
        else {
            return {};
        }
    }
    catch (err) {
        console.error(err);
        return {};
    }
}
exports.parseSearch = parseSearch;
