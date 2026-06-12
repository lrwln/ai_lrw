# 基于Prompt 做NLP 任务开发

    import form

- 有哪些东西可以模块化？
  - 维护与可读性
  - 复用性 方便引入
- 项目的模块化搭建
  - main. mjs 单点入口文件(鉴权、路由)
  - client.mjs 提供llm client对象
  - completion.mjs 负责完成任务的函数

# es6 语法特性
es6 时JavaScript 于2015年发布的版本，引入了许多新的语法特性和功能 目标是让js成为一个企业级大型项目开发语言
- let const 声明提升bug解决 指出块级作用域
  let const 不能重复声明 const 简单数据类型不能重新赋值 引用数据类型可以重新赋值 但其指向的内存地址不能改变
- reset运算符 | spread运算符
  - rest运算符 用于函数参数中 将剩余的参数收集到一个数组中
  - spread运算符 用于数组或对象中 将一个数组或对象展开成单独的元素
- 解构赋值(便于提取数据)
  - 对象
  - 数组
- 模块化 esm
- import export
  - export default 只能有一个 默认导出
  - export 可以有多个 直接导出
  
## nlp 任务
- 情感分类
  正面 | 负面 | 中性
  在电商行业中 可以用来分析用户评论的情感倾向 从而帮助商家改进产品和服务 预警差评

- 信息提取/文本摘要
- 