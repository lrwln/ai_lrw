//node 多进程执行架构 node 主进程 agent 执行 
// js单线程 
// 调用工具去执行命令行任务 分离出去 独立的子进程
// 子进程
// child process 做完后 ipc(进程间通信) 通知主进程 
import {
    spawn //启动一个子进程
} from 'node:child_process'
// mini cursor I/O 命令行
//agent tool 自动化
const command = 'ls -al'; // commmand linux 命令 列出所有文件 shell 脚本
const [cmd, ...args] = command.split(' ');//命令和参数 分离出来
const cwd = process.cwd();//当前工作目录
// 开启子进程 执行命令行任务
const client = spawn(cmd, args, {
    cwd,
    stdio: 'inherit',// 命令
    shell: true,

});//
let errorMsg = '';
client.on('error', (err) => {
    errorMsg = err.message;
});
client.on('close', (code) => {
    if (code === 0) {//命令执行成功 成功退出
        process.exit(0);//成功退出 主进程
    } else {
        if (errorMsg) {
            console.error(`命令执行失败:${errorMsg}`);
        }
        process.exit(code || 1);
    }
});


