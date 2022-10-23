// function imAsync(customCallback: Function) {
//     console.log("Im being async: \n " + imAsync)
//     setTimeout(function () {
//         console.log("3 seconds")
//         customCallback()
//     }, 3000)
// }

import internal from "stream"

// imAsync(function () {
//     console.log("Im the first callback")
// })

function hi(name: string, customCallback: Function) {
    setTimeout(function () {
        console.log("hello, " + name)
        customCallback(name)
    }, 1500)
}

function talk(customCallback: Function) {
    setTimeout(function () {
        console.log("Blablabla...")
        customCallback()
    }, 1500)
}

function goodbye(name: string, customCallback: Function) {
    setTimeout(function () {
        console.log("goodbye", name)
        customCallback()
    }, 1000)
}

function conversation(name: string, times: number, callback: Function) {
    if (times > 0) {
        talk(function () {
            conversation(name, --times, callback)
        })
    } else {
        goodbye(name, callback)
    }
}

// --

console.log("Starting process...")

hi("Mu", function (name: string) {
    conversation(name, 3, function () {
        console.log("Finishing process...")
    })
})

// hi("Test", function (name: string) {
//     talk(function () {
//         talk(function () {
//             goodbye(name, function () {
//                 console.log("Finishing process...")
//             })
//         })
//     })
// })
