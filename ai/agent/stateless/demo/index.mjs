import { OpenAI } from "openai/client.js";
import { config } from "dotenv";
config();


const client = new OpenAI({
    apiKey: process.env.DEEPSEEK_API_KEY,
    baseURL: process.env.DEEPSEEK_API_BASE_URL,

});

//对话历史
const chatHistory = [
    {
        role: 'system',
        content: '你是一个严谨的助手'
    },

]

async function testStateless() {
    console.log('第一次请求，告诉模型一个信息')
    //为了让模型记住用户的名字，我们每次带上history
    chatHistory.push({
        role: 'user',
        content: '请记住，我的名字叫凌凌漆'
    })




    const response = await client.chat.completions.create({
        model: 'deepseek-v4-pro',
        messages: chatHistory
        //[
        //     {
        //         role: 'system',
        //         content: '你是一个严谨的助手',
        //     },
        //     {
        //         role: 'user',
        //         content: '请记住，我的名字叫凌凌漆'
        //     }
        // ]
    });
    chatHistory.push({
        role: 'assistant',
        content: response.choices[0].message.content
    })
    console.log('模型回复:', response.choices[0].message.content)
    console.log('第二次请求，直接说我是谁');
    chatHistory.push({
        role: 'user',
        content: '直接说出我的名字'
    })
    const response2 = await client.chat.completions.create({
        model: 'deepseek-v4-pro',
        messages: chatHistory
        //[
        //     {
        //         role: 'user',
        //         content: '我是谁？我的名字是什么？'
        //     }
        // ]
    });
    chatHistory.push({
        role: 'assistant',
        content: response2.choices[0].message.content
    })
    console.log('模型回复:', response2.choices[0].message.content);
    console.log(chatHistory)
}




// console.log(testStateless());
// testStateless()
//     .catch(err => {
//         console.log(err);
//     });

//就是将message存到chatHistory中，每次请求都带上chatHistory，这样模型就能记住之前的对话内容了。