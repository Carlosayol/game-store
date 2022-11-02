function asyncFunction(callback: Function) {
    setTimeout(() => {
        try {
            let a = 3 + 1
            callback(null, a)
        } catch (error) {
            callback(error)
        }
    }, 1000)
}

asyncFunction((err: Error, data: Number) => {
    if (err) {
        console.error("We have an error")
        console.error(err)
        return false

        // throw err
    }

    console.log(`Everything is fine, my data is: ${data}`)
})
