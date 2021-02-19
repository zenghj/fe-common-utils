/**
 * 生成签名函数
 * @param signKey 业务对应的签名key，不传时使用默认值
 */
export default function createSignFunction(signKey?: string): (queryParams: Object) => string;
