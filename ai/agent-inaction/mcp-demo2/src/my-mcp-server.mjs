//跨进程调用
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js'
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js'
import { z } from 'zod'

const database = {
    users: {
        '001': {
            id: '001',
            name: '张三',
            email: 'zhangsan@qq.com',
            role: 'admin'
        },
        '002': {
            id: '002',
            name: '李四',
            email: 'lisi@qq.com',
            role: 'user'
        },
        '003': {
            id: '003',
            name: '王五',
            email: 'wangwu@qq.com',
            role: 'user'
        }


    }
}

const server = new McpServer({
    name: 'my-mcp-server',
    version: '1.0.0'
})
server.registerTool('query_user', {
    description: '查询数据库中的用户信息。输入用户ID,返回用户的详细信息',
    inputSchema: {
        user_id: z.string().describe('用户ID,例如:001,002,003')
    }
}, async ({ user_id }) => {
    const user = database.users[user_id]
    if (!user) {
        return {
            content: [
                {
                    type: 'text',
                    text: `用户${user_id}不存在 可用用户ID:001,002,003`
                }
            ]
        }
    }
    return {
        content: [
            {
                type: 'text',
                text: `用户${user_id}的信息如下:\nID:${user.id}\n姓名:${user.name}\n邮箱:${user.email}\n角色:${user.role}`
            }
        ]
    }
}

)
//跨进程通信方式 stdio
const transport = new StdioServerTransport()
await server.connect(transport)









