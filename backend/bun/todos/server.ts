//任务资源
//
//面向对象核心概念
interface Todo {
    id: string;
    title: string;
    completed: boolean;
    createdAt: Date;//data是一种时间对象
}
//资源
// 想向外暴露---http协议传递
const todos: Todo[] = [//为Todo数组
    {
        id: "1",
        title: "eat foods",
        completed: false,
        createdAt: new Date(),
    },
    {
        id: "2",
        title: "sleep",
        completed: false,
        createdAt: new Date(),
    },
    {
        id: "3",
        title: "play games",
        completed: false,
        createdAt: new Date(),
    }
];
//bun内置了高性能的服务器
const server = Bun.serve({
    port: 8080,//127.0.0.1:8080 这是本地地址，端口号是8080
    // ip 对应一台服务器 不同的端口 提供不同的服务
    //http server 处于伺服状态 http是基于请求req响应response的协议 
    //伺服状态：服务器一直在运行，等待用户的请求
    //用户通过浏览器输入url 发送一个请求(也就叫req对象--代表着用户 可以有多个)
    //server fetch函数 Bun.serve的内置方法，所有的请求都会在这里处理 这个fetch函数不是全局的fetch函数
    async fetch(req) {
        const headers = {
            // 门户放开
            'Access-Control-Allow-Origin': "*"
        }
        //异步任务，控制流程 await
        console.log(req);
        //https://baidu.com:port/pathname/:params?a=1&n=2
        const url = new URL(req.url);//会拿到用户要访问的地址...端口...等等
        if (url.pathname === "/todos")
            return Response.json(todos);
        if (req.method === "GET" && url.pathname.startsWith("/todos/")) {
            const id = url.pathname.split("/")[2];
            const todo = todos.find((t) => t.id === id);
            console.log(todo, "-----");
            return Response.json(todo,{
                headers//传递headers，允许跨域访问
            });
        }
        //在url.pathname--字符串上面有个startsWith方法，判断是否以某个字符串开头
        return Response.json({ msg: "hello world" })
    }
})
