# JS的同步和异步
## js中有哪些异步任务？
cpu执行时间 不能霸占,几十毫秒的轮询分配给进程的执行时间
进程 董事长 PID process
线程 经理 TID Thread 具体的执行者
主线程、还可以启动子线程

- c++,java等多线程语言，线程之间可以并行执行,执行效率高 复杂
- js单线程，线程之间不能并行执行，执行效率低  简单
    setTimeout
    事件...
    怎么办？

## JS的执行机制(Event Loop)
- 前端script 或后端node/bun 代码执行
- 启动一个进程 PID 负责分配资源
- 进程启动一个主线程 TID 负责执行代码
- 先将同步任务快速执行完毕，渲染页面
- js中有定时器、fetch请求、事件等耗时性的任务 Async task
- js会将他们放入event loop中，等待主线程空闲时执行(同步代码执行完毕后) 

## 如果需要控制执行流程呢？
promise 解决回调地狱问题
async/await 让异步代码看起来像同步代码，更加直观易读
## 理解promise
- 实例化Promise对象，传入一个executor函数，executor函数接受两个参数：resolve和reject
- executor函数会立即执行，进行一些异步操作，当异步操作完成时，调用resolve函数将Promise对象的状态从pending变为fulfilled，并传递结果给then方法；如果异步操作失败，调用reject函数将Promise对象的状态从pending变为rejected，并传递错误信息给catch方法
- Promise对象有一个then方法，用于注册成功和失败的回调函数。当Promise对象的状态变为fulfilled时，成功回调函数会被调用，并接收resolve传递的结果；当Promise对象的状态变为rejected时，失败回调函数会被调用，catch并接收reject传递的错误信息
- finally方法用于注册一个无论Promise对象状态如何都会被调用的回调函数，通常用于清理资源或执行一些收尾工作
- Promise对象本质就是检查异步代码完成的状态结果的一个容器








