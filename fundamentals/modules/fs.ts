import fs from "fs"

function read(route: string) {
    fs.readFile(route, (err, data) => {
        console.log(data.toString())
    })
}

function write(route: string, content: string) {
    fs.writeFile(route, content, function (err) {
        if (err) {
            console.error("error: " + err)
        }
    })
}

read(__dirname + "/file.txt")
write(__dirname + "/file1.txt", "This is a new file")
