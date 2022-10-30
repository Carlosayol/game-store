import bcrypt, { hash } from "bcrypt"

const password = "1234secure"

bcrypt.hash(password, 5, function (err, hash) {
    console.log(hash)

    bcrypt.compare(password, hash, function (err, res) {
        console.log(res)
    })
})
