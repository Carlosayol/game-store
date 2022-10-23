async function hi(name: string): Promise<string> {
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            console.log("hello, " + name)
            resolve(name)
        }, 1500)
    })
}

async function talk(name: string): Promise<string> {
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            console.log("Blablabla...")
            resolve(name)
        }, 1500)
    })
}

async function goodbye(name: string): Promise<void> {
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            console.log("goodbye", name)
            resolve()
        }, 1000)
    })
}

async function main() {
    let name = await hi("Test")
    await talk(name)
    await talk(name)
    await goodbye(name)
}

main()
