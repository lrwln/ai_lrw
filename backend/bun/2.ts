function add(a: number, b: number) {
    return a + b;
}

//
let a = 1
let b = '2';
// add(a,parseInt(b));//api
console.log(add(a, Number(b)));//强制类型转换
// add(a, +b);//一元加运算符 也可以实现类型转换 隐式转换
