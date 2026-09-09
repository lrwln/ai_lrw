import OpenAI from 'openai';
import dotenv from 'dotenv';
dotenv.config();
//模块化输出 client可以复用

export const client = new OpenAI({
    apiKey: process.env.DASHSCOPE_API_KEY,
    baseURL: 'https://dashscope.aliyuncs.com/compatible-mode/v1'
})

// const response = await client.embeddings.create({
//     model: 'text-embedding-v4',
//     input: "let's go"
// });