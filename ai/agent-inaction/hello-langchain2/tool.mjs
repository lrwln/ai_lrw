import 'dotenv/config';
import { ChatOpenAI } from '@langchain/openai';
// import { Tool } from '@langchain/core/tools';
import { tool } from '@langchain/core/tools';
import {
    HumanMessage,
    SystemMessage,
    ToolMessage,
    AIMessage,
} from '@langchain/core/messages';
import fs from 'node:fs/promises';
import { z } from 'zod';//提供参数校验 类型约束

const model = new ChatOpenAI({
    modelName: 'deepseek-v4-flash',
    apiKey: process.env.DEEPSEEK_API_KEY,
    temperature: 0,
    configuration: {
        baseURL: 'https://api.deepseek.com/v1',
    },
});

// 定义一个工具，用于读取文件内容
const readFileTool = tool(
    async ({ filePath }) => { //功能函数
        const content = await fs.readFile(filePath, 'utf-8');
        //时刻反馈agent执行消息
        //agent 任务可能很复杂 很耗时  需要给用户反馈
        console.log(`[工具调用] read_file(${filePath})
            成功读取文件内容: ${content} ${content.length} 字节`)
        return content;
    },
    {
        name: 'read_file',
        description: '用此工具读取文件内容,当用户需要读取文件内容,查看代码,分析文件内容时,调用此工具。输入文件路径(可以是相对路径或绝对路径),输出文件内容',
        schema: z.object({
            filePath: z.string().describe('文件路径'),
        }),
    }
)

const tools = [
    readFileTool,
]
//langchain 提供了工具调用的模型
const modelWithTools = model.bindTools(tools);

const messages = [
    new SystemMessage(
        `
        你是一个代码助手、可以使用工具读取文件并解释代码。
        工作流程：
        1.用户要求读取文件时，立刻调用read_file 工具
        2.等待工具返回文件内容
        3.基于文件内容进行分析和解释

        可用工具：
        -read_file:读取文件内容(使用此工具来获取文件内容)

        `),
    new HumanMessage('请读取文件 tool.mjs 的内容,并解释代码'),
];

let response = await modelWithTools.invoke(messages);
console.log(JSON.stringify(response));





