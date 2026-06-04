let friends = []
async function loadData() {
    const endpoint = 'http://localhost:3000/friends'
    const res = await fetch(endpoint)
    const data = await res.json()
    friends = data
}

function renderData() {
    const oBody = document.querySelector('table tbody')
    if (friends.length > 0) {
        oBody.innerHTML = friends.map(friend => `
            <tr>
                <td>${friend.id}</td>
                <td>${friend.name}</td>
            </tr>
        `).join('')
    }
}

async function init() {
    console.log('init start')
    await loadData()
    renderData()
}

init()

// async function loadData() {
//     console.log('loadData')
// }


// function renderData() {
//     console.log('renderData')
//     const oBody = document.querySelector('table tbody')
//     if (friends.length > 0) {
//         oBody.innerHTML = friends.map(function (friends) {
//             console.log(friends)
//             return `
//             <tr>
//                 <td>${friends.id}</td>
//                 <td>${friends.name}</td>
//                 <td>${friends.age}</td>
//             </tr>
//             `
//         }).join('')
//     }
//     oBody.innerHTML = ''
// }
// // 异步与同步
// async function init() {
//     console.log('init start')
//     //endpoint : 后端接口地址
//     const endpoint = 'http://localhost:3000/friends'
//     // 异步变同步操作
//     const res = await fetch(endpoint)
//     const data = await res.json()
//     return data
//     //从后端获取数据 也就是本地数据
//     // await fetch(endpoint)//发送请求 是异步操作
//     // // await 是等待异步操作完成的语法
//     //     //等待响应返回

//     //     .then(res => res.json())//————>响应体 是json格式二进制字符串 转换为json对象
//     //     .then(data => {
//     //         console.log(data)
//     //     })

//     await loadData()
//     renderData()
// }
// init();
