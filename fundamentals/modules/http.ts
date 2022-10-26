import http from "http"

http.createServer((req, res) => {
    console.log("Nueva peticion")
    console.log(req.url)

    switch (req.url) {
        case "/test":
            res.write("Hello test")
            break

        default:
            res.write("error")
    }

    res.end()
}).listen(3000)
