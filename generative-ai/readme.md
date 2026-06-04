# Generative AI 
英伟达证书

- apiKey 
  - gitignore + .env
- npm init -y 
   初始化node 项目  package.json 
- npm i openai
   安装openai 模块 事实标准 
   - 安装需要花时间，消耗空间
   - pnpm 
   只需要安装一次，不同的项目中软链接。

   npm install -g pnpm
- .gitignore
  git 声明要忽略的文件
  apiKey 不能提交？(隐私)
  留在本地
  写在.env文件中,.gitignore 中配置 git会忽略
- apikey 读取进来的流程
- 安装dotenv库可以读取.env文件
- env格式 key(大写) = value (占据单行)
- 读取到process进程对象中
- .env文件就是环境变量的配置文件
  
- mjs后缀和js后缀的区别
mjs是es6后推出的模块化方案 ESM
moudle js
.js 后缀？
package.json type添加module字段
- nodemon 监听文件的变化

## async/await
es8 新增的异步编程语法
js 代码编写顺序和执行顺序不同
变量声明/异步任务(setTimout,api请求)
async/await 来卡住执行流程 让编写顺序和执行顺序相一致
当api返回结果后 继续执行后面的代码

## AIGC 工程化开发流程总结
- ai项目/agent项目 几乎都是后端项目
- npm init -y 初始化为后端项目
- pnpn i openai/dotenv
- 实例化client
- main 单点入口函数
  - main.mjs 单点入口文件
  - mian 单点入口函数
- 调用chat completion api
  同步代码按顺序执行 cpu轮询到便执行 十分快速
  100ms内完成
  - 异步代码 等同步代码执行完毕才开始执行
   如何控制异步执行顺序
   async await 同上执行顺序和编写流程相一致 代码可读性更好