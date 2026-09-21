import 'dotenv/config'
import { MultiServerMCPClient } from '@langchain/mcp-adapters';
import { ChatOpenAI } from '@langchain/openai';
import chalk from 'chalk';
import {
    HumanMessage,
    SystemMessage,
    ToolMessage
} from '@langchain/core/messages';

const model = new ChatOpenAI({
    modelName: 'deepseek-v4-flash',
    apiKey: process.env.DEEPSEEK_API_KEY,
    temperature: 0,
    configuration: {
        baseURL: 'https://api.deepseek.com/v1',
    },
});

const mcpClient = new MultiServerMCPClient(
    {
        "mcpServers": {
            "my-mcp-server": {
                "command": "node",
                "args": ["D:/code/2026/ai_lrw/ai_lrw/ai/agent-inaction/mcp-demo2/src/my-mcp-server.mjs"]
            }
        }
    })
// 获取工具
const tools = await mcpClient.getTools();
const modelWithTools = model.bindTools(tools);

async function runAgentWithTools(query, maxIterations = 30) {
    const messages = [
        new HumanMessage(query)
    ];
    for (let i = 0; i < maxIterations; i++) {
        console.log(chalk.bgGreen(`正在等待ai思考,第${i + 1}轮...`))
        const response = await modelWithTools.invoke(messages);
        messages.push(response);
        if (!response.tool_calls || response.tool_calls.length === 0) {
            console.log(`\n ai最终回复:\n ${response.content}`)
            return response.content
        }
        console.log(chalk.bgBlue.bgBlue(`检测到 ${response.tool_calls.length} 个工具调用`))
        console.log(chalk.bgBlue(`工具调用详情:\n ${response.tool_calls.map(t => t.name).join(', ')}`))

        for (const toolCall of response.tool_calls) {
            const foundTool = tools.find(t => t.name === toolCall.name)
            if (foundTool) {
                const toolResult = await foundTool.invoke(toolCall.args)
                messages.push(new ToolMessage({
                    content: toolResult,
                    tool_call_id: toolCall.id,
                }))

            }
        }
    }
    //循环次数===30 依旧无法解决问题 返回最后一轮结果
    return messages[messages.length - 1].content;
}
await runAgentWithTools(`查询一下用户002的信息`);











