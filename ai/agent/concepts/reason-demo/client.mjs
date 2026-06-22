// 负责 提供llm client 对象
import OpenAI from "openai";
import dotenv from "dotenv";


dotenv.config();// 读取环境变量 即读取 .env 文件中的内容
const client = new OpenAI({
    apiKey: process.env.DEEPSEEK_API_KEY,
    baseURL: process.env.DEEPSEEK_API_BASE_URL,
});
// export const a = 2;//直接导出
// export const b = 3;//
export default client;//默认导出