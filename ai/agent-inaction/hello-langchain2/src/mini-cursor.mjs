//手写mini cursor
console.log('DEEPSEEK_API_KEY =', process.env.DEEPSEEK_API_KEY ? '已加载' : '未加载');
// 使用vite 基于react 创建todolist 项目 编程agent 自动化 
//给出目录列表
import 'dotenv/config';
import { ChatOpenAI } from '@langchain/openai';// 引入openai 模型
import {
    HumanMessage,
    AIMessage,
    SystemMessage,
    ToolMessage
} from '@langchain/core/messages';// 引入消息类型
import {
    executeCommandTool,
    readFileTool,
    writeFileTool,
    listDirectoryTool
} from './all-tools.mjs';// 引入工具类型
import chalk from 'chalk';
const model = new ChatOpenAI({
    modelName: 'deepseek-v4-pro',
    apiKey: process.env.DEEPSEEK_API_KEY,
    temperature: 0,
    configuration: {
        baseURL: 'https://api.deepseek.com/v1',
    },
});

const tools = [
    executeCommandTool,
    readFileTool,
    writeFileTool,
    listDirectoryTool
]

const modelWithTools = model.bindTools(tools);// 绑定工具到模型，使模型能够使用工具完成任务

const case1 = `
创建一功能丰富的React Todolist 应用
1.创建项目 : echo -e "n\nn" | pnpm create vite react-todo-app --template react-ts
2.修改 src/App.tsx,实现完整功能的TodoList:
- 添加、删除、标记完成
- 分类筛选(全部、进行中、已完成)
- 统计信息显示
- localStorage 数据持久化存储
3.添加复杂样式
- 渐变背景(不廉价 非科技风 太极国风)
- 卡片阴影 圆角
- 悬停效果
4.添加动画 (符合第三点要求)
- 删除/添加时的过渡动画 
- 使用css transitions
5.列出目录确定项目结构

注意:使用pnpm 安装依赖，功能完整，样式符合要求、美观 动画效果平滑 pnpm create vite 只创建骨架，不会写业务代码。创建完成后，你必须继续执行第 2、3、4 步，否则任务不算完成。

在 react-todo-app项目中:
1.使用pnpm install 安装依赖
2.使用pnpm run dev 启动服务器
`

//agent 执行函数 React思维框架 reasoning act observe
async function runAgentWithTools(query, maxIterations = 30) {
    const messages = [
        new SystemMessage(`你是一个项目管理助手，使用工具完成任务。
            当前工作目录: ${process.cwd()}
            工具:
            1.read_file:读取文件
            2.write_file:写入文件
            3.execute_command:执行命令
            4.list_directory:列出目录
            
            - pnpm create vite 只创建骨架，不写业务代码
            - 不要因为脚手架打印 "Done" 就停止，那只是骨架完成
            - 不要反复 dir / ls 检查已经确认的信息
            - 不要启动 dev server

            重要规则 - execute_command:
            - workingDirectory 参数会自动切换到指定目录
            - 当使用 workingDirectory 时，绝对不要在 command 中使用 cd
            - 错误示例: { command: "cd react-todo-app && pnpm install", workingDirectory: "react-todo-app" }
            这是错误的！因为 workingDirectory 已经在 react-todo-app 目录了，再 cd react-todo-app 会找不到目录
            - 正确示例: { command: "pnpm install", workingDirectory: "react-todo-app" }
            这样就对了!workingDirectory 已经切换到 react-todo-app,直接执行命令即可
            回复要简洁，只说做了什么
            `),
        new HumanMessage(query)
    ]
    //React 循环agent
    for (let i = 0; i < maxIterations; i++) {// 最大迭代次数
        console.log(chalk.bgGreen(`正在等待第${i}次 ai思考`))
        const response = await modelWithTools.invoke(messages);
        messages.push(response);
        if (!response.tool_calls || response.tool_calls.length === 0) {
            console.log(`\n:AI 最终回复:\n ${response.content}\n`);
            return response.content;
        }

        for (const toolCall of response.tool_calls) {
            const foundTool = tools.find(t => t.name === toolCall.name)
            if (foundTool) {
                const toolResult = await foundTool.invoke(toolCall.args);
                messages.push(new ToolMessage({
                    tool_call_id: toolCall.id,
                    content: toolResult
                }));
            }
        }
    }
    return messages[messages.length - 1].content;
}


try {
    await runAgentWithTools(case1);
} catch (error) {
    console.error('执行失败:', error.message);
}











