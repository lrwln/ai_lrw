const tree = {
    val: '1',
    left: {
        val: '2',
        left: {
            val: '5',
            left: null,
            right: null
        },
        right: {
            val: '6',
            left: null,
            right: null
        }
    },
    right: {
        val: '3',
        left: {
            val: '7',
            left: null,
            right: null
        },
        right: {
            val: '8',
            left: null,
            right: null
        }
    }
};


const preorder = (root) => {

    if (!root)
        return;
    console.log(root.val);
    preorder(root.left)
    preorder(root.right)


};
preorder(tree);

