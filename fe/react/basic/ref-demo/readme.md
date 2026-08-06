# react 常用hooks
## useState 
响应式的状态
## useEffect
附作用
## useRef
可变对象 
- 可变，但不希望触发渲染？
- 绑定DOM 对象
react 不直接操作DOM
万一要操作DOM? 

## DOM编程
- js 在v8 引擎
- dom 在渲染引擎
js 里做DOM 编程非常耗性能。
- react vue 之前 原生js 做DOM 编程
- react vue 新框架 
  直接规避DOM编程， 不要做DOM编程，
  react框架帮我们做。
  useState 数据绑定+响应式编程  
  前端开发方式直接改变

## 如果非要去dom ? 
  不是不可以做DOM 编程，
  而是交给react 
  如果需要DOM useRef 来了 
  - useRef 申明一个可变对象 null
  - jsx dom ref 属性绑定
  current指向这个dom 节点对象
  - useEffect  
  - 和useState相同点和区别点
  都可以改变 useState 聚焦数据状态业务
  useRef  DOM 对象引用等..
  - useState 响应式的
  - useRef 非响应式的
## 总结定义
useRef 是react的一个提供持久可变对象的hook函数， 经常用来引用DOM 节点
对象。它有一个current 属性， 可以执向任何值或对象， 不会触发渲染。

## useRef worker 对象

## js ? 单线程
做一些前端交互，脚本工作，简单，显示和操作的页面，一致性，不能
出问题，js 如果是多线程可能就会有冲突 

页面复杂起来， 有很多任务要干，耗时任务 ， event loop js 执行机制
异步无阻塞， 不要卡在这里，前端要尽快去响应用户的交互（滚动屏幕，点击..）

llm, 游戏， 非界面的业务逻辑， 很耗费计算时间， event loop 异步
搞不定， 用worker 线程，接下更耗时，复杂的任务，浏览器独立开辟的
内存，复杂计算，完成后告知主线程（消息机制）

## Web Worker 线程
浏览器提供给js 可以调用的耗时性计算，或者llm、游戏等复杂任务的worker 线程。

JS 单线程，event loop 机制 运行的代码，
不适合某些复杂计算业务，html5 提供的新特性。Web Worker 线程。
- 开启一个新的线程
new Worker(
  new URL('./worker.js', import.meta.url)
)