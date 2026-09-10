import { ChatOpenAI, } from '@langchain/openai';
import 'dotenv/config';

const model = new ChatOpenAI({
    modelName: 'deepseek-v4-flash',
    apiKey: process.env.DEEPSEEK_API_KEY,
    configuration: {
        baseURL: 'https://api.deepseek.com/v1',
    },
});

const res = await model.invoke('你好');
console.log(res.content);







