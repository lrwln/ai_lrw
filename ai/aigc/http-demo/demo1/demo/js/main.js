//http请求的三个注册部分
// url + method(请求方法fetch) + http 版本号 请求行 


const endpoint = 'https://api.deepseek.com/chat/completions';
//header 请求头
const headers = {
    'Content-Type': 'application/json',
    //api key 通过 带上
    Authorization: `Bearer ${apiKey}`,
    //改为apikey
}

//payload 请求体
const payload = {
    //模型名称
    model: 'deepseek-v4-pro',
    messages: [
        {
            role: 'system',
            content: 'You are a helpful assistant'
        },
        {
            role: 'user',
            content: '你好，'
        }
    ]
}

try {
    const response = await fetch(endpoint, {
        method: 'POST',
        headers,
        //http 请求里 传输的不能是对象
        //只能是字符串
        body: JSON.stringify(payload)//将payload转换为json字符串
    })
    //将响应体转换为json字符串
    const data = await response.json();
    console.log('响应数据:', data);
    //将响应数据赋值给reply元素
    document.getElementById('reply').innerHTML = data.choices[0].message.content;
} catch (error) {
    console.error('请求失败:', error);
}