/**
 *
 * @param fn 回调函数
 * @param duration 时间间隔
 * @returns  返回一个新的函数
 * @解析
 * 先声明一个函数作为这个函数的返回结果，当多次掉用这个函数的返回结果时，
 * 会形成一个闭包也就是preventShake函数中的变量例如timer就可以被return返回的结果函数所用，
 * 因此每调用一次这个函数的时候就会先清除一下上一次的timer然后再执行这个函数，
 * 考虑的是：只有当闭包中的某个变量不再被使用的时候闭包才会消失，也就是说这个如果放在某些类似于click中的
 * 事件，底层垃圾回收机制是不知道该变量是否被需要的，也就不会对他进行回收
 */
export function preventShake(callback: Function, duration: number) {
  let timer: any
  return function () {
    clearTimeout(timer)
    timer = setTimeout(() => {
      callback()
    }, duration)
  }
}
/**
 * @param fn 回调函数
 * @param duration 时间间隔
 * @returns  返回一个新的函数
 *  @升级点  当return 中需要传入参数的时候
 */
export function preventShake2(callback: (this: any, ...args: any[]) => void, duration: number) {
  let timer: any
  return function (...args: any) {
    clearTimeout(timer)
    timer = setTimeout(() => {
      callback.apply(null, args)
    }, duration)
  }
}

/**
 *  函数apply(thisArg,argArray)
 *  函数call(thisArg,arg1,arg2,...)
 *  函数bind(thisArg,arg1,arg2,...)
 * @解析：三者的用法都是差不多的，都是为了解决函数的this指向问题
 */

/**
 *
 * @param fn 回调函数
 * @param duration 时间间隔
 * @returns  返回一个新的函数
 * @解析  函数节流指的是在一定时间内该事件只会执行一次，下面是用定时器实现的第一种方法
 */
export function throttling(callback: (...args: any[]) => void, duration: number) {
  let timer: any
  return function (...args: any) {
    if (timer) return
    timer = setTimeout(function () {
      callback.apply(null, args)
      timer = null
    }, duration)
  }
}
/**
 *
 * @param fn 回调函数
 * @param duration 时间间隔
 * @returns  返回一个新的函数
 * @解析  函数节流指的是在一定时间内该事件只会执行一次，下面是用时间戳实现的第二种方法，通过判断是否是第一次以及后面每隔多少时间执行一次
 */
export function throttling2(callback: (...args: any[]) => void, duration: number) {
  let timer: any
  return function (...args: any) {
    if (!timer || Date.now() - timer > duration) {
      callback.apply(null, args)
      timer = Date.now() //得到当前的时间戳
    }
  }
}
