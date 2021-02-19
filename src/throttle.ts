/**
 * 
 * @param fn 
 * @param delay 
 */
export default function throttle(fn, delay) {
  var now, lastExec, timer, context, args

  var execute = function() {
    fn.apply(context, args)
    lastExec = now
  }

  return function() {
    context = this
    args = arguments

    now = Date.now()

    if (timer) {
      clearTimeout(timer)
      timer = null
    }

    if (lastExec) {
      var diff = delay - (now - lastExec)
      if (diff < 0) {
        execute()
      } else {
        timer = setTimeout(() => {
          execute()
        }, diff)
      }
    } else {
      execute()
    }
  }
}
