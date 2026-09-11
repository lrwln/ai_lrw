import 'dotenv/config';
import { ChatOpenAI } from '@langchain/openai';
// import { Tool } from '@langchain/core/tools';
import { Tool, tool } from '@langchain/core/tools';
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
    new HumanMessage('请读取文件 src/tool.mjs 的内容,并解释代码'),
];

let response = await modelWithTools.invoke(messages);
console.log(JSON.stringify(response));
messages.push(response);//将agent 回复添加到消息数组中
//多个工具 await read await write 并发？
// response.tools 性能 有多个数组 promise.all tool promises数组
// tool 执行结果 每个结果 带上tool id ToolMessage 给messages数组添加
// 把messages数组 传递给模型 递归调用 得到最后的结果


//？？？
while (response.tool_calls && response.tool_calls.length > 0) {
    //调用工具
    console.log(`\n[检查到 ${response.tool_calls.length}] 个工具调用`)
    const toolResults = await Promise.all(
        response.tool_calls.map(async (toolCall) => {

            const tool = tools.find((t) => t.name === toolCall.name);
            if (!tool) {
                return `工具不存在${toolCall.name}，无法调用`
            }
            console.log(`[工具调用] ${toolCall.name}(${JSON.stringify(toolCall.args)})`)
            //langchain的工具调用方法
            try {
                const result = await tool.invoke(toolCall.args);
                return result;
            } catch (err) {
                return `工具调用失败${toolCall.name}(${JSON.stringify(toolCall.args)})：${err.message}`
            }
            const result = await tool.invoke(toolCall.args);
            return result;
        })
    )
}


