const { Children } = require("react");

const tree = {
    val: 'a',//初始根节点
    Children: [//根节点的子节点
        {
            val: 'b',
            Children: [
                {
                    val: 'c',
                    Children: [
                        {
                            val: 'd'
                        }
                    ]
                }
            ]
        },
        {
            val: 'e',
            Children: [
                {
                    val: 'f',
                    Children: [
                        {
                            val: 'g'
                        }
                    ]
                }
            ]
        }
    ],
}

const bfs = (root) => {
    const queue = [root]//把当前根节点入队
    while (queue.length > 0) {
        const children = queue.shift()//将队头取出
        console.log(children.val)//将当前根节点的子元素进行访问
        children.Children.forEach(child => {
            queue.push(child)//将该子节点下它的子节点推入
        });//因为

    }
}

bfs(tree)
