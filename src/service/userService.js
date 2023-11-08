import mysql from 'mysql2'

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'jwt-hoidanit'
})

import bcrypt from 'bcryptjs'
const salt = bcrypt.genSaltSync(10);



let handleHashPassword = (password) => {
    let hashPassword = bcrypt.hashSync(password, salt)
    return hashPassword
}

const createNewUser = (data) => {
    let username = data.username
    let email = data.email
    let password = data.password
    let hashPassword = handleHashPassword(password)
    connection.query(`INSERT INTO users (username, email, password) values(?, ?, ?)`, [username, email, hashPassword], function (err, results, fields) {
        if (err) {
            console.log(err)
        }
    })
}

const getUserList = () => {
    let users = []
    connection.query(`SELECT * FROM users`, function (err, results, fields) {
        if (err) {
            console.log(err)
        }
        console.log(results)
    })
}

module.exports = {
    createNewUser, getUserList
}