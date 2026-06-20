//node内置的http模块
//早期的js前端是没有模块化系统的  require + module.exports  commonjs
//node 一定要上模块化方案 commonjs
//esm 是升级版的 import + export  es6模块化方案
//require()方法用来引入模块，返回一个对象
//require node   早期的模块化系统 commonjs
const { log } = require('console');
//伺服状态
const http = require('http');


http.createServer((req, res) => {//req 请求对象  res 响应对象
    //用户服务函数
    const todos = [
        {
            id: '1',
            title: '期末考试通过',
            completed: false,

        },
        {
            id: '2',
            title: '四级考试通过',
            completed: false,
        }
    ]
    if (req.url === '/') {
        res.end("hello world");
    }
    if (req.url === '/todos') {
        // 传输的是二进制文本  需要把对象转换成字符串
        res.setHeader('Content-Type', 'application/json; charset=utf-8');
        res.end(JSON.stringify(todos));
    }

}).listen(3000, () => {
    console.log(`server is running on 3000 port`)
})




