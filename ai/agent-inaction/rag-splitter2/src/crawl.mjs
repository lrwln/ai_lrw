//网页爬虫 并解析其中指定的部分 css选择器
import axios from "axios"
import * as cheerio from 'cheerio';
// 向url发送http请求 html字符串 

const targetUrl = "https://juejin.cn/post/7660707431753678854"

async function crawlPage() {
    try {
        const res = await axios.get(targetUrl)
        // console.log(res.data)
        console.log("-----------------")
        console.log(res)
        const $ = cheerio.load(html)//将html转换为dom树 与jquery语法一致
        const pageTitle = $('.main-area p').text()
        console.log(pageContent)
    } catch (e) {

    }
}
crawlPage();










