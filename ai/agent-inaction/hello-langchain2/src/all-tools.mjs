// import { tool } from 'langchain/core/tools';
// import fs from 'node:fs/promises';
// import path from 'node:path';// node 内置的path模块 可以处理路径 判断路径合法性
// import { spawn } from 'node:child_process';
// import { z } from 'zod';// 引入zod 模块 用于校验输入参数


// // I/O 工具
// // 读取文件内容工具
// const readFileTool = tool(
//     async ({ filePath }) => { //功能函数
//         const content = await fs.readFile(filePath, 'utf-8');
//         //时刻反馈agent执行消息
//         //agent 任务可能很复杂 很耗时  需要给用户反馈
//         console.log(`[工具调用] read_file(${filePath})
//             成功读取文件内容: ${content} ${content.length} 字节`)
//         return content;
//     },
//     {
//         name: 'read_file',
//         description: '用此工具读取文件内容,当用户需要读取文件内容,查看代码,分析文件内容时,调用此工具。输入文件路径(可以是相对路径或绝对路径),输出文件内容',
//         schema: z.object({
//             filePath: z.string().describe('文件路径'),
//         }),
//     }
// )
// //写入文件工具
// const writeFileTool = tool(
//     //path模块 专门的路径模块 agent执行正确服务 
//     //
//     async ({ filePath, content }) => { //功能函数
//         //1.确认路径是否存在 
//         //2.写入文件 utf-8 编码写入
//         //3.容错处理
//         try {
//             const dir = path.dirname(filePath);
//             console.log(dir, '目录')
//             //如果目录不存在 则创建目录 如果目录存在 则直接写入文件
//             //递归含义: 递归创建目录 如果目录不存在 则创建目录 如果目录存在 则直接写入文件
//             await fs.mkdir(dir, { recursive: true });
//             //写入文件
//             await fs.writeFile(filePath, content, 'utf-8');
//             console.log(`[工具调用] write_file(${filePath}, ${content})
//                 成功写入文件: ${filePath} ${content.length} 字节`);
//             return `成功写入文件: ${filePath}`;
//         } catch (error) {
//             console.log(`[工具调用] write_file(${filePath}, ${content})
//                 失败写入文件: ${error.message}`);
//             return `写入文件失败: ${error.message}`;
//         }
//     },
//     {
//         name: 'write_file',
//         description: '用此工具写入文件内容,当用户需要写入文件内容,修改代码,生成代码时,调用此工具。输入文件路径(可以是相对路径或绝对路径),文件内容(可以是代码,文本等),输出写入结果',
//         schema: z.object({
//             filePath: z.string().describe('文件路径'),
//             content: z.string().describe('文件内容'),
//         }),
//     }
// )

// //列出目录内容工具
// const listDirectoryTool = tool(
//     async ({ directoryPath }) => { //功能函数
//         try {
//             //列出目录内容 包含文件和文件夹
//             const files = await fs.readdir(directoryPath);
//             console.log(`[工具调用] list_directory(${directoryPath})
//             成功列出目录内容: ${files} ${files.length} 个文件和文件夹`);
//             return `成功列出目录内容: \n${files.map(file => file.name).join('\n')}`;
//         } catch (error) {
//             console.log(`[工具调用] list_directory(${directoryPath})
//                 失败列出目录内容: ${error.message}`);
//             return `列出目录内容失败: ${error.message}`;
//         }
//     },
//     {
//         name: 'list_directory',
//         description: '用此工具列出目录内容,当用户需要列出目录内容,查看目录结构时,调用此工具。输入目录路径(可以是相对路径或绝对路径),输出目录内容',
//         schema: z.object({
//             directoryPath: z.string().describe('目录路径'),
//         }),
//     }
// )

// //执行命令行工具 实时输出？
// const executeCommandTool = tool(
//     async ({ command, directoryPath }) => {
//         const cwd = directoryPath || process.cwd();
//         console.log(`[工具调用] execute_command(${command}, 工作目录: ${cwd})
//             成功执行命令: ${command} ${cwd}`)
//         return new Promise((resolve, reject) => {
//             const [cmd, ...args] = command.split(' ');//命令和参数 分离出来
//             // 开启子进程 执行命令行任务
//             const client = spawn(cmd, args, {
//                 cwd,
//                 stdio: 'inherit',// 命令
//                 shell: true,
//             });//
//             let errorMsg = '';
//             client.on('error', (err) => {
//                 errorMsg = err.message;
//             });
//             client.on('close', (code) => {
//                 if (code === 0) {//命令执行成功 成功退出
//                     console.log(`[工具调用] execute_command(${command}, 工作目录: ${cwd})
//                         成功执行命令: ${command} ${cwd}`);
//                     resolve(`命令执行成功: ${command} 工作目录: ${cwd}`);//cwd是当前工作目录
//                 } else {
//                     console.log(`[工具调用] execute_command(${command}, 工作目录: ${cwd})
//                         失败执行命令: ${command} ${cwd} 退出码: ${code}`);
//                     resolve(`命令执行失败,退出码: ${code} 错误信息: ${errorMsg}`);
//                 }
//             }
//             );
//         })
//     },
//     {
//         name: 'execute_command',
//         description: '用此工具执行命令行任务,当用户需要执行命令行任务,查看系统信息,操作文件等时,调用此工具。输入命令行任务(可以是shell 脚本,系统命令等),输出命令执行结果',
//         schema: z.object({
//             command: z.string().describe('命令行任务'),
//             directoryPath: z.string().describe('目录路径')
//         }),
//     }
// )
import { tool } from '@langchain/core/tools';
import fs from 'node:fs/promises';
// 判断路径的合法性 路径的拼接 ... 
import path from 'node:path'; // node 内置的 path 模块
import { spawn } from 'node:child_process'
import { z } from 'zod';

// I/O 工具
// 读文件
const readFileTool = tool(
    async ({ filePath }) => {   // 功能函数
        const content = await fs.readFile(filePath, 'utf-8');
        // 时刻反馈Agent 执行消息
        // Agent 任务可能很复杂,很耗时，需要给用户反馈 用户可能
        // 太久没有看到反馈， 退出
        console.log(`[工具调用] read_file(${filePath})
        成功读取 ${content.length} 字节`)
        return content;
    },
    {
        name: 'read_file',
        description: `用此工具来读取文件内容，当用户要求读取文件、
        查看代码、分析文件内容时，调用此工具。输入文件路径（
        可以是相对路径或绝对路径）`,
        schema: z.object({
            filePath: z.string().describe('要读取的文件路径')
        })
    }
)

// 写文件
const writeFileTool = tool(
    // path 模块 专门的路径模块 Agent执行正确服务 
    // path 路径  /src/all-tool.mjs 路径模块
    async ({ filePath, content }) => {
        // 1. 确认路径是否在当前工作目录下
        // 2. 写入文件， utf-8 
        // 3. 容错处理
        try {
            const dir = path.dirname(filePath);
            console.log(dir, '目录');
            //  已存在 目录不创建  
            // 递归创建 /a/b/c/123.js
            await fs.mkdir(dir, { recursive: true });
            // 写入文件
            await fs.writeFile(filePath, content, 'utf-8');
            console.log(`[工具调用] write_file(${filePath})
            成功写入 ${content.length} 字节`)
            return `成功写入 ${filePath}`
        } catch (err) {
            console.log(`[工具调用] write_file(${filePath})
            错误： ${err.message}`)
            return `写入文件失败：${err.message}`
        }
    },
    {
        name: 'write_file',
        description: '向指定路径写入文件内容，自动创建目录',
        schema: z.object({
            filePath: z.string().description('文件路径'),
            content: z.string().describe('要写入的文件内容')
        })
    }
)

// 列出目录内容工具 
const listDirectoryTool = tool(
    async ({ directoryPath }) => {
        // 后端以稳定为主 
        try {
            // 列出目录下的所有文件和文件夹
            const files = await fs.readdir(directoryPath);
            console.log(`[工具调用] list_directory(${directoryPath})
            成功列出 ${files.length} 个文件和文件夹`)
            return `目录内容：\n ${files.map(file => file.name).join('\n')}`
        } catch (err) {
            console.log(`[工具调用] list_directory(${directoryPath})
            错误： ${err.message}`)
            return `列出目录内容失败：${err.message}`
        }
    },
    {
        name: 'list_directory',
        description: '列出指定目录下的所有文件和文件夹',
        schema: z.object({
            directoryPath: z.string().describe('目录路径')
        })
    }
)

// 执行命令工具（带实时输出）
const executeCommandTool = tool(
    async ({ command, directoryPath }) => {
        const cwd = directoryPath || process.cwd();
        console.log(`[工具调用] execute_command(${command})
        工作目录：${cwd}`);
        return new Promise((resolve, reject) => {
            const [cmd, ...args] = command.split(' ');
            const child = spawn(cmd, args, {
                cwd,
                stdio: 'inherit',
                shell: true,
            })
            let errorMsg = '';
            child.on('error', (err) => {
                errorMsg = err.message
            });
            child.on('close', (code) => {
                if (code === 0) { // 运行顺利，成功退出
                    console.log(`[工具调用] execute_command(${command})
                   成功执行`)
                    const cwdInfo = workingDirectory ?
                        `\n\n重要提示：命令在目录“${workingDirectory}” 执行`
                        : '';
                    resolve(`命令行成功执行 ${command}${cwdInfo}`);
                } else {
                    console.log(`[工具调用] execute_command(${command})
                    退出码：${code}`)
                    resolve(`命令执行失败，退出码：${code}\n 错误：${errorMsg}`)
                }
            })
        })

    },
    {
        name: 'execute_command',
        description: '执行系统命令，支持指定工作目录，实时显示输出',
        schema: z.object({
            command: z.string().describe('要执行的命令'),
            directoryPath: z.string().describe('工作目录(推荐指定)')
        })
    }
)




