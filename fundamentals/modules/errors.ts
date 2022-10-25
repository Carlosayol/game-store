function broken() {
    return new Error("hi")
}

try {
    var a = broken()
} catch (err) {
    console.log("Something is broken")
}

console.log("Hi")
