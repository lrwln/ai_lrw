# Model Scope
魔搭 前辈为Huggingface ai界的github
- model
开源大模型发布的一个平台、训练及发布自己的模型
- scope
社区 

## 数据服务

## Note Book
如果我们有机器学习NLP 实验、算法，python
note book 随时编写 随时运行

python 语法简洁 特别适合数学运算、
NLP，AI，爬虫
- js不太合适去做运算
Web前端脚本 交互(幻灯片、滚动加载......)
JS 为弱数据类型 Number....
"人生苦短 我用python"

复合语句结尾必须加:,表示下一行为从属代码块 缩进

## LLM api 调用
- 安装openai sdk
- 实例化client
  api_key
  base_url
  遵守同样的接口标准
- client.chat.completions.
create()
    aigc 文本生成的接口
    model
    prompt

## Prompt 高级设计模式
- 详细 准确的指令
- 一步步的引导llm去工作
- 对返回结果的格式做出约束
  json格式
  - 清晰正确
  - json适合接下来的继续运行


python的 llm的 升级的prompt运用 json