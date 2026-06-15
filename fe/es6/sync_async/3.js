//promise es6用于异步任务控制的最佳机制 
const p = new Promise((resolve, reject) => {
    //放置耗时性任务
    setTimeout(() => {
        console.log('let`s goooooo')
        resolve('任务完成')
    }, 1000);
});// Promise 构造函数接受一个函数作为参数，这个函数会立即执行，并且接受两个参数：resolve 和 reject。这两个参数都是函数，用于控制 Promise 的状态。
console.log(p.__proto__)

p.then(() => {
    console.log('success')
})
    .catch(() => {
        console.log('error')
    }
//promise就是一个对象，具有then方法，then方法接受一个函数作为参数，这个函数会在Promise状态改变为resolved时被调用，并且接受一个参数，这个参数就是resolve函数传递的值。
//catch方法接受一个函数作为参数，这个函数会在Promise状态改变为rejected时被调用，并且接受一个参数，这个参数就是reject函数传递的值。
//promise内写入异步代码 当执行完成是能够将结果可现化

