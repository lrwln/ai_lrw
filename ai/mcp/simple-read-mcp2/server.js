//实例化mcp server

// import { Server } from '@modelcontextprotocol/sdk/server/index.js'
// //本地通信
// import { StdioServerTransport } from
//     '@modelcontextprotocol/sdk/transport/stdio.js';
import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
//列出所有工具的schema
import {
    ListToolsRequestSchema,
    CallToolRequestSchema //调用工具的schema
} from '@modelcontextprotocol/sdk/types.js';
import fs from 'fs/promises';

const server = new Server(
    { name: 'simple-read-server', version: '1.0.0' },
    { capabilities: { tools: {} } }
)
//处理agent发出的请求
//ListToolsRequestSchema mcp的事件之一 列出所有工具
server.setRequestHandler(ListToolsRequestSchema, async (request) => ({
    tools: [
        {
            name: 'read-file',
            description: '读取指定路径的本地文件内容',
            inputSchema: {
                type: 'object',
                properties: {
                    path: {
                        type: 'string',
                        description: '文件的绝对或相对路径'
                    }
                },
                required: ['path']
            }

        }
    ]
}));
//调用工具
server.setRequestHandler(CallToolRequestSchema, async (request) => {
    const { name, arguments: args } = request.params;
    if (name === 'read-file') {
        try {
            const content = await fs.readFile(args.path, 'utf-8');
            return {
                content: [
                    { type: 'text', text: content }
                ]
            }
        } catch (err) {
            return {
                isError: true,
                content: [{
                    type: 'text',
                    text: `读取文件失败:${err.message}`
                }]
            }
        }
    }

    throw new Error(`工具${name}不存在`);
});



async function main() {
    //链接本地通信transport 通信通道
    const transport = new StdioServerTransport();
    await server.connect(transport);
}

main();





