let sum = 0

console.time("1")
for (let i = 0; i < 1000000000; i++) {
    sum += 1
}
console.timeEnd("1")
