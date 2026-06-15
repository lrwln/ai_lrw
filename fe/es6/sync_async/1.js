//同步代码 sync 

console.log('start')
//异步代码 async
setTimeout(() => {//（参数） => {}
    console.log('timeout')
}, 1000)

console.log('end')

