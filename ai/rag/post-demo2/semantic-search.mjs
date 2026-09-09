//rag 实现语义搜索
import fs from 'fs/promises';// 支持promise 的fs模块
import { client } from './app.service.mjs';//为啥{ client } 不能直接写成client ？因为client是一个对象，必须使用解构赋值的方式导入
import readline from 'readline';//node 内置的 读取标准输入

const inputFilePath = './data/post-embedding.json';//输入文件路径
const data = await fs.readFile(inputFilePath, 'utf-8');//读取文件内容 
const posts = JSON.parse(data);

const cosineSimilarity = (v1, v2) => {
    // 计算向量的点积
    const dotProduct = v1.reduce((acc, curr, i) => acc + curr * v2[i], 0);

    // 计算向量的长度
    const lengthV1 = Math.sqrt(v1.reduce((acc, curr) => acc + curr * curr, 0));
    const lengthV2 = Math.sqrt(v2.reduce((acc, curr) => acc + curr * curr, 0));

    // 计算余弦相似度
    const similarity = dotProduct / (lengthV1 * lengthV2);

    return similarity;
};

// console.log('解析JSON成功:', posts[0]);
//命令行交互
const rl = readline.createInterface({
    input: process.stdin, //标准输入 问题
    output: process.stdout //标准输出 回答
});

const handleInput = async (answer) => {
    console.log(`你输入的内容是: ${answer}`);
    // rl.close();//关闭命令行交互
    // rl.question("\n请输入你要搜索的内容:", handleInput);
    const response = await client.embeddings.create({
        model: 'text-embedding-v4',
        input: answer
    });
    const { embedding } = response.data[0];
    // 计算每个post的相似度
    //返回一个新的数组
    const results = posts.map(item => ({
        ...item,
        similarity: cosineSimilarity(embedding, item.embedding)
    })).sort((a, b) => b.similarity - a.similarity)//按相似度降序排序
        .slice(0, 5)//取前5个最相似的结果
        .map((item, index) => `${index + 1}. 标题: ${item.title}, 分类: ${item.category}, 相似度: ${item.similarity.toFixed(4)}`)//格式化输出
        .join('\n');
    console.log('搜索结果:', results);
    rl.close();//关闭命令行交互
}

rl.question("\n请输入你要搜索的内容:", handleInput);
