//v8引擎眼里
// var myname作了声明提升，函数showName也做了声明提升
// 声明提升和变量提升是两回事，
// 声明提升是函数提升，变量提升是变量提升
//函数提升：函数声明会被提升到当前作用域的顶部
//变量提升：变量声明会被提升到当前作用域的顶部，但赋值不会被提升
//所以在执行showName()时，函数showName已经被提升了，所以可以正常执行
//但是在执行console.log(myname)时，变量myname虽然被提升了，但还没有赋值，所以输出undefined



//v8引擎眼里
var myname //这是变量提升，声明提升是函数提升
function showName() {// 声明提升
    console.log('函数showName执行')
}

showName()
console.log(myname)
myname = '张三'
// 执行过程--代码--v8引擎--编译--执行上下文--执行