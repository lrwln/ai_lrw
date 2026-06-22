import client from "./client.mjs";// 导入 client 对象
// dotenv.config();// 读取环境变量 即读取 .env 文件中的内容


const main = async () => {
    const result = await client.chat.completions.create({
        model: 'deepseek-v4-pro',
        reasoning_effort: 'high',//推理努力程度，high表示高推理努力，low表示低推理努力
        messages: [
            {
                role: 'system',
                content: '你是一个足球领域的专家，请尽量帮我回答与足球相关的问题'
            },
            {
                role: 'user',
                content: '介绍并锐评一下c罗近些年的表现，并与梅西进行比较，给出你的答案和分析'
            },
            {
                role: 'assistant',
                content: 'c罗是葡萄牙的足球运动员'
            },
            {
                role: 'user',
                content: '内马尔呢？'
            }]
    });
    console.log('思考过程: ');
    console.log(result.choices[0].message.reasoning_content);
    console.log('\n最终答案: ')
    console.log(result.choices[0].message.content);
}