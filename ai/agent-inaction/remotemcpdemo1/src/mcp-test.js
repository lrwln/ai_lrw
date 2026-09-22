import 'dotenv/config'
import { MultiServerClient } from 'langchain/mcp-adapters'
import { ChatOpenAI } from 'langchain/openai'
import chalk from 'chalk'
import {
    HumanMessage,
    SystemMessage,
    ToolMessage
} from 'langchain/core/messages'


const model = new ChatOpenAI({
    modelName: 'deepseek-v4-pro',
    apiKey: process.env.DEEPSEEK_API_KEY,
    configuration: {
        baseURL: 'https://api.deepseek.com/v1',
    },
});

const mcpClient = new MultiServerClient({
    model,
    servers: {
        amapMapsHttp: {
            url: 'amap-maps-http',
        },
    },
})

const mcpClient = new MultiServerMCPClient({
    model,
    servers: {
        amapMapsHttp: {
            url: 'amap-maps-http',
        },
    },
})


