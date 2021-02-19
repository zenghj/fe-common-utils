export default function timeout(asyncFn, delay, immediateWhenSync = true) {
  return new Promise((resolve, reject) => {
    let promise = asyncFn()
    if (promise && promise.then) {
      promise.then(result => {
        resolve(result)
      }, err => {
        console.error(err)
        reject(err)
      })
    } else if (immediateWhenSync) {
      resolve(promise)
    }

    setTimeout(() => {
      reject(new Error('timeout'))
    }, delay)
  })
}
