 # AI游戏

- 页游
4399 flash 游戏
html5 3d/2d 游戏

## HTMl5的炫酷功能  canvas
Canvas 2d/3d 数据可视化/网页游戏
- canvas是html5新增的标签，提供了一个画布，可以通过js在上面绘制图形、动画等内容。
- canvas 标签
画布 可以调用js api 进行绘制

- canvas api
  - canvas 有大量的js 绘制api 
  - 首先获取canvas标签
  - 获取渲染上下文 getContext('2d') 获取2d渲染上下文
  - getContext('webgl') 获取3d渲染上下文
    ai游戏爆发 three.js 3d游戏引擎
    /物理大模型
  - 绘制各种图形 
    - rect 方形
    - circle 圆形
    - line 线条
    - clearRect 擦除矩形区域 左上角+宽高
    - 颜色 
    - fillStyle  填充
    - strokeStyle 描边

- 如何做游戏
  按帧动画
  - clear 擦掉之前的
  - 画上新的
  - 显卡帧 1s 60次

## requestAnimationFrame
- requestAnimationFrame 是浏览器提供的一个API，用于在浏览器的下一次重绘之前执行一个函数，通常用于实现动画效果。浏览器提供的适配器会根据设备的刷新率来调用这个函数，通常是每秒60次，这样可以确保动画的流畅性。
- 不能用setTimeout 或 setInterval 来实现动画，因为它们的时间间隔不稳定，可能会导致动画卡顿或不流畅。
- 参数 递归的方法 callback函数
- clear 方法
   帧动画不停更新 就有了动画
   加上交互便成了游戏
  
## 飞机游戏项目
- 工程初始化
  vite git 
  帮我们安装些必要的依赖
  .env
- 可以和cc 头脑风暴
  - 产品 游戏功能列表,选择其中的一些，做第一个阶段的开发
  mvp 最小可行产品/方案
  技术路线是什么样的？
  技术方案

- llm 生成 

## 数据可视化
echart 报表
 
  


### 基础
- 1.基础
- 渲染上下文
- getContext('2d') 获取2d渲染上下文
- getContext('webgl') 获取3d渲染上下文
- 2.绘制图形
- a.线
- 绘制


