import "dotenv/config"
import "cheerio"
//从url加载文档
import { CheerioWebBaseLoader } from "@langchain/community/document_loaders/web/cheerio"
//cheerio可以传递css选择器 来提取文档内容 缩小范围
const cheerioLoader = new CheerioWebBaseLoader("",
    {
        selector: '.main-area p'
    }
)
const documents = await cheerioLoader.load();
console.log(documents)






