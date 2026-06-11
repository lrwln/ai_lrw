import client from "./client.mjs";

export async function getCompletion(prompt) {
    const response = await client.chat.completions.create({
        model: process.env.DEEPSEEK_MODEL_NAME,
        messages: [//对话消息数组，包含用户输入的提示信息
            {
                role: "user",
                content: prompt
            }
        ]
    });
    return response.choices[0].message.content;//返回生成的文本内容
}


export async function getImage(prompt) {

}




