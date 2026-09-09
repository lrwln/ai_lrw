#手写文件处理mcp
- server fs 读取文件
  - schema声明 函数名 读取文件内容
返回 上下文 给llm 
- server还要满足mcp协议
  
## 开发
- 安装zod
数据验证 schema
- @modelcontexprotol/sdk
协议的sdk 通信部分  
cc prompt -> llm ->分析 —>选中 fs client ->stdioservertransport -> stdin -> server -> stdout -> stdioservertransport -> cc ->llm ->generate


