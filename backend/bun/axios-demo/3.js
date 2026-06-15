// 如何封装一个sleep函数来模拟网络请求的延迟？

function sleep(ms) {
    //es6提供的 解决异步问题的api Promise是一个构造函数 需要new来创建实例
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve() // 任务完成后调用resolve来通知Promise状态改变为fulfilled
        }, ms)
    })
}


async function main() {
    console.log('--start--')
    //await 后面接收promise
    await sleep(2000) // 异步任务同步化
    console.log('--end--')


}

