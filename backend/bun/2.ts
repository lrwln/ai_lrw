function add(a: number, b: number): number {
    return a + b;
}

//
let a = 1
let b = '2';
let c: number = add(a, parseInt(b));

// add(a,parseInt(b));//api
// console.log(add(a, Number(b)));//强制类型转换
// add(a, +b);//一元加运算符 也可以实现类型转换 隐式转换
