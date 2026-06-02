// 如何将.env 中的apikey读取进来
// dotenv
import dotenv from 'dotenv'
import { OpenAI } from 'openai/client.js';

dotenv.config()
const client = new OpenAI({
    apiKey: process.env.DEEPSEEK_API_KEY,
    baseURL: process.env.DEEPSEEK_BASE_URL
});

// process? 进程对象
// 操作系统的核心概念
// eg: node index.mjs 本质启动进程
// 进程是分配资源(内存 cpu IO)的最小单位
// node 中就是 process 这个全局对象
// process.env 是一个对象 包含了环境变量
// console.log(process.env.DEEPSEEK_API_KEY)
// console.log(process.env,
//     process.env.DEEPSEEK_API_KEY)
// async修饰符 表示函数是异步的
// 函数内部可以用await关键字 等待异步操作完成
const main = async function () {

    console.log('程序开始')
    const result = await client.chat.completions.create({
        model: 'deepseek-chat',
        messages: [{ role: 'user', content: 'hello' }]
    })
    // console.log(result)
    console.log(result.choices[0].message.content)
    // setTimeout(function () {
    //     console.log('等待运行')
    // }, 1000)
    console.log('程序结束')
}
main();
