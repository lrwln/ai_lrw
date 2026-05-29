# es6

JavaScript 蹭了一波Java热度 弱类型动态语言 早期随机用来给网页添加交互(幻灯片) DOM 编程
JS 是以Escript(???)为语言标准的一门编程语言
ES6 是JS的新版本 ES6后的都统称为ES6+
2015年发布 逐渐靠向、服务于企业级大型项目开发发展
JS 是一个KPI项目 仅仅用一周便开发出来

## 声明变量并赋值
- var es5 逐渐减少使用 
- let es6+ 代替了var


## 作用域 scope

### 作用域的嵌套
- 全局作用域
- 函数局部作用域
  - 局部作用域
- 块级作用域
变量属于作用域，
变量声明，js弱类型，类型由赋的值决定
- 查找变量的规则(作用域链)
  -先从现在当前作用域查找
    -在一步步向外层作用域查找
    冒泡查找
- 含数/代码块运行后，垃圾回收机制运行
  -内存角度 变量的声明
  在内存之中申请对应的空间
  结束后 销毁函数，回收内存
  变量的生命周期

- Assignment to constant variable
- ReferenceError: XXX is not defined

## var let const
早期的js 用var声明变量，没有常量.. 以代码规范约束
例:var PI = 3.1415926 
var不支持块级作用域
js的开发时间过短 浏览器的副产品
因此js仍存在瑕疵与缺陷
let 变量，const 常量 都支持块级作用域
const constant variable 不可变变量

## for + setTimeout
var 不支持块级作用域 只有一个i
var 声明的 i，整个循环只有一个 i，不是每次循环创建一个新的。
你可以把它想象成房间里有一块黑板，上面写着 i 的值，每次循环都在同一块黑板上擦了重写  
内存里只有一个 i

同步代码 每次循环立即执行

异步代码必须等同步代码执行完毕后才能开始
setTimeout 异步代码 只能从内存找到一个i 打印的是循环跑完后的i 
let 支持块级作用域 嵌套着n个局部作用域
内存里有3个独立的i
setTimeout即使为异步代码 也能从内存中找出多个独自的i

const 声明时就得赋值 let声明和赋值可以分开
const 修饰的简单数据类型值不可改变
但复杂数据类型的值可以改变

## 变量的提升(var) hoisting
- 因为代码是先编译
  准备执行上下文
  全局执行上下文
- 再执行运行
- 应该避免变量提升
  let 不支持变量提升:ReferenceError:Cannot access'pizza' before initializ
ation
