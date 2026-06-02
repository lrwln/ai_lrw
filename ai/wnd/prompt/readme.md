# 吴恩达ai应用中的Prompt

## Prompt Principle
- 使用清晰 详细的prompt
- llm约束返回的格式/结构 
- 五个构建块
  
## get_response 函数
- 参数默认值是函数代码优化的重要语法特性
- 复用 灵活 简便
- llm api
   - completion 完成
      prompt
   - chat.completions
       message:[
        {"role":"system",}
        {"role":"user",content:prompt},
        {"role":"assistant",content:''}
        {"role":"user",content:""},
       ]


## 吴恩达 prompt 规则
llm智能能力高级,靠谱的为我们工作？
通过一系列规则 减少智能的随机性 增加对应的稳定性 与生成的方向的准确性
- 清晰具体的表达
   清晰 让大模型理解对应的目的 不偏离主题 减少错误
   具体 提供相应的上下文
   - 总结案例里使用的清晰的格式区间 告诉llm我们待处理的文本位置
   {text} {} 是字符串模板中的占位符
   使用特殊的符号```来清晰的指出要处理的文本
   总结 summmarize nlp 机器学习的常见任务
- 对响应的结果格式做一个约束 一般为json格式
   继续丰富json的key 增加注释(自然语义的加持)
- Few一shot即少样本提示，在Prompt里附带少量示例，让模型参照格式、逻辑与风格，快速对齐任务要求，无需复杂指令。
- llm 的幻觉 真真假假