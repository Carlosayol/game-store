function hi(name: string): Promise<string> {
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            console.log("hello, " + name)
            resolve(name)
        }, 1500)
    })
}

function talk(name: string): Promise<string> {
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            console.log("Blablabla...")
            resolve(name)
        }, 1500)
    })
}

function goodbye(name: string): Promise<void> {
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            console.log("goodbye", name)
            resolve()
        }, 1000)
    })
}

console.log("Starting process...")
hi("Mu")
    .then(talk)
    .then(goodbye)
    .then(() => {
        console.log("Finishing process...")
    })
