# llm http 接口

## 向前端发送http 请求


### 这是一种什么编程模式？
- 前后端分离
- 异步的 async/await
fetch 是一个异步操作，返回一个Promise对象 
- Browser/Server架构
- Client/Server架构
  - app android/ios
  
  -软件 java/nodejs
  - http://127.0.0.1:3000
   ip:端口号
    何为ip地址
    ip地址是唯一标识一台计算机的地址
    www.baidu.com 是域名，指向ip地址
    dns 是域名解析服务，将域名转换为ip地址
- api url 是后端接口地址  配置命名为endpoint管ff理 
  就是api请求的终点 即api向哪请求数据
  - async/await 控制了异步操作的顺序 执行流程
  - 先请求数据接口
  - 等待数据返回 即请求完数据接口
  - 处理数据 将返回的数据转换为json对象 -> tr字符串(模板字符串).map()
  - 渲染数据
  
  查看mdn官方文档 详细了解每一个api的使用方法