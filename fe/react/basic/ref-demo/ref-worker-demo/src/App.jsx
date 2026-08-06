import {
  useRef,
  useState,
  useEffect
} from 'react';

function App() {
  // 为组件的渲染 挂载让路
  const workerRef = useRef(null); // 可持久化的可变对象
  useEffect(() => {
    // 开启一个worker 线程 开销比较大的
    // ref 引用了worker 线程。
    workerRef.current = new Worker(
      new URL("./worker.js", import.meta.url)
    );
  }, [])
  // 主线程 单线程 web worker 
  // 离开主线程？ 开辟新的线程
  // console.time('主线程');
  // for (let i = 0; i < 100000000; i++) {
  //   console.log(i);
  // }
  // console.timeEnd('主线程');
  // 阻塞页面
  return (
    <>
    </>
  )
}

export default App