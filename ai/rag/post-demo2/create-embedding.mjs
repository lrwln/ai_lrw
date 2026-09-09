//post.json 向量化
// - 首先node 内置的fs模块 读取文件到内存
// - JSON.parse() 每一项await embedding 加到 json数组中
// - 写入文件embedding 长期储存
// 使用node 内置的fs模块读取post.json文件内容，并将其转换为字符串，然后使用JSON.parse()方法将字符串解析为JavaScript对象。接着，使用map()方法遍历对象数组，将每个对象的content属性传递给OpenAI的embeddings.create()方法，生成向量化结果。最后，将向量化结果存储在一个新的数组中，并使用fs.writeFileSync()方法将其写入到一个新的JSON文件中。

import fs from 'fs/promises';// 支持promise 的fs模块
import { client } from './app.service.mjs';//为啥{ client } 不能直接写成client ？因为client是一个对象，必须使用解构赋值的方式导入

//上下文的路径
const inputFilePath = './data/posts.json';//输入文件路径
const outputFilePath = './data/post-embedding.json';//输出文件路径

const data = await fs.readFile(inputFilePath, 'utf-8');//读取文件内容
// console.log('读取文件内容成功:', data);

const posts = JSON.parse(data);//将字符串解析为JavaScript对象
console.log('解析JSON成功:', posts[0]);

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));//定义一个sleep函数，返回一个Promise对象，延迟指定的毫秒数后resolve

const postsWithEmbeddings = []

for (const { title, category } of posts) {
    const response = await client.embeddings.create({
        model: 'text-embedding-v4',
        //语义更加准确 可以细致的语义匹配
        input: `${title} ${category}`

    });

    postsWithEmbeddings.push({
        title,
        category,
        embedding: response.data[0].embedding
    })
    await sleep(200);//每次请求后延迟0.2秒，避免请求过快导致被封禁
}
await fs.writeFile(outputFilePath, JSON.stringify(postsWithEmbeddings, null, 2), 'utf-8');//将向量化结果写入到新的JSON文件中
