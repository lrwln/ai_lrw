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
        }
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
const dfs = (root) => {//传入的是tree的根节点
    console.log(root.val)
    root.Children.forEach(dfs)
}



