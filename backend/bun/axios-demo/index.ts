// console.log("Hello via Bun!");
// http的方式请求llm的接口
// bun 能代替 npm做包管理器
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();
console.log(process.env.llm_api_url, "-----");

async function chat() {
    try {

        const res = await axios.post(`${process.env.llm_api_url}`,

            {
                model: 'deepseek-v4-pro',
                messages: [
                    {
                        role: 'user',
                        content: '介绍一下bun'
                    }
                ]
            },
            {
                headers: {
                    'Content-Type': 'application/json',//告诉服务器请求体的格式是json字符串
                    'Authorization': `Bearer ${process.env.llm_api_key}`// 授权信息 需要在环境变量中配置llm_api_key

                }

            }
        )//GET 请求存在上限
        //apikey等隐私数据会被get请求暴露在url中 可能被泄露
        //POST 请求会把数据放在请求体中 不会暴露在url中 更安全
        //POST 请求没有长度限制 可以发送更大的数据 适合发送复杂的请求体
        //请求行 url method http version
        //请求头 包含一些元信息 例如 content-type authorization等
        //请求体 包含实际的数据 例如json字符串等
        //get请求没有请求体 只能通过url传递参数 可能会有长度限制和安全问题
        //fetch http请求的api 但是它没有内置的json解析和错误处理 需要手动处理响应和错误
        //axios http 请求的是框架 它封装了fetch 提供了更方便的api 例如自动解析json 自动处理错误等
        // console.log(res.data);
        console.log(res.data.choices[0].message.content);

    } catch (error) {// 处理错误
        console.log(error.message);
    }
}

chat();
