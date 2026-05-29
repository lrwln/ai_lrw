// function setWidth() {
//     var width = 100
//     console.log(width)
// }
// setWidth()

for (var i = 0; i < 10; i++) {
    // 同步代码 为了尽快实行,效率更高    
    console.log(i)
    //异步代码 i变为了10
    setTimeout(function () {
        console.log(i)
    }, 1000)
}