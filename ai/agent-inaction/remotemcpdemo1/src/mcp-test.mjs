import 'dotenv/config'
import { MultiServerMCPClient } from '@langchain/mcp-adapters'
import { ChatOpenAI } from '@langchain/openai'
import chalk from 'chalk'
import {
    HumanMessage,
    SystemMessage,
    ToolMessage
} from '@langchain/core/messages'


const model = new ChatOpenAI({
    modelName: 'deepseek-v4-pro',
    apiKey: process.env.DEEPSEEK_API_KEY,
    configuration: {
        baseURL: 'https://api.deepseek.com/v1',
    },
});

// const mcpClient = new MultiServerMCPClient({
//     mcpServers: {
//         'my-mcp-server': {
//             "url": "https://mcp.amap.com/mcp?key=98d9c49e48d60f757db163b1794087a8"
//         },
//         'my-mcp-server': {
//             command: 'node',
//             args: [
//                 "D:/code/2026/ai_lrw/ai_lrw/ai/agent-inaction/mcp-demo2/src/my-mcp-server.js"
//             ]
//         }
//     }
// })

const mcpClient = new MultiServerMCPClient({
    mcpServers: {
        'my-mcp-server': {
            "url": "https://mcp.amap.com/mcp?key=98d9c49e48d60f757db163b1794087a8"
        },
        'my-mcp-server': {
            command: "node",
            args: [
                "D:/code/2026/ai_lrw/ai_lrw/ai/agent-inaction/mcp-demo2/src/my-mcp-server.mjs"
            ]
        },
        'filesystem': {
            command: 'npx',
            args: [
                '-y',
                '@modelcontextprotocol/server-filesystem',
                // 允许访问的文件夹，可以配置多个，用空格隔开
                'D:/code/2026/ai_lrw/ai_lrw/ai/agent-inaction/remotemcpdemo1'
            ]
        },
        // Chrome‑DevTools MCP，默认连接本地打开的Chrome（开启远程调试：chrome --remote-debugging-port=9222）
        'chrome-devtools': {
            command: 'npx',
            args: [
                '-y',
                'chrome-devtools-mcp@latest',
            ]
        }
    }
})


const tools = await mcpClient.getTools();
console.log(tools);
const modelWithTools = model.bindTools(tools);

async function runAgentWithTools(query, maxRetries = 30) {
    const messages = [
        new HumanMessage(query),
    ]
    for (let i = 0; i < maxRetries; i++) {
        console.log(chalk.bgGreen(`第${i + 1}次调用`));
        const response = await modelWithTools.invoke(messages);
        messages.push(response);

        if (!response.tool_calls || response.tool_calls.length === 0) {
            console.log(chalk.bgRed(`ai回答:${response.content}`));
            return response.content;
        }
        console.log(chalk.bgBlue(`工具调用：
            ${response.tool_calls.map(t => t.name).join(',')}
            `))
        for (const toolCall of response.tool_calls) {
            const foundTool = tools.find(t => t.name === toolCall.name)
            if (foundTool) {
                const toolResult = await foundTool.invoke(toolCall.args)
                let contentStr;
                if (typeof toolResult === 'string') {
                    contentStr = toolResult;

                } else if (toolResult && toolResult.text) {
                    contentStr = toolResult.text;
                }
                messages.push(new ToolMessage({
                    tool_call_id: toolCall.id,
                    content: contentStr
                }))
            }
        }
    }

    return messages[messages.length - 1].content;
}
await runAgentWithTools('北京南站附近的酒店，最近的 3 个酒店，拿到酒店图片，打开浏览器，展示每个酒店的图片，每个 tab 一个 url 展示，并且在把那个页面标题改为酒店名');






