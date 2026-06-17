const { Children } = require("react");

const tree = {
    val: 'a',
    Children: [
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



}

bfs(tree)
