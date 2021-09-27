/**
 * 时间戳转换为Date对象
 * @param timestamp 
 * @returns 
 */
export function timestamp2Date(timestamp:number):Date {
  return new Date(timestamp);
}

/**
 * 将个位数字用0补齐
 * @param {*} num
 */
function padding(num:number) {
  if (num < 10) {
    return `0${num}`;
  }
  return num;
}

/**
 * 简版格式化时间
 * @param {Number | Date} timestamp
 * @param {String} format 形如 'YY/MM/DD hh:mm:ss'
 * @returns {String}
 */
export function formateDateStr(timestamp: number | Date, format = 'YY/MM/DD'):string {
  if (timestamp == null) throw new Error('need param timestamp');
  const date =
    timestamp instanceof Date ? timestamp : timestamp2Date(timestamp);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const h = date.getHours();
  const m = date.getMinutes();
  const s = date.getSeconds();
  return format
    .replace('YY', '' + year)
    .replace('MM', '' + padding(month))
    .replace('DD', '' + padding(day))
    .replace('hh', '' + padding(h))
    .replace('mm', '' + padding(m))
    .replace('ss', '' + padding(s));
}

/**
 * 格式化时长
 * @param second 
 * @returns 
 */
export function formateDuration(second) {
  const h = Math.floor(second / 3600);
  second = second % 3600;
  const m = Math.floor(second / 60);
  const s = second % 60;
  return (h > 0 ? `${h}:` : '') + `${padding(m)}:` + `${padding(s)}`;
}
