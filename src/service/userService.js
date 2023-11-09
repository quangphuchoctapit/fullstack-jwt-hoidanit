import mysql from 'mysql2/promise'

import bluebird from 'bluebird'




import bcrypt from 'bcryptjs'
const salt = bcrypt.genSaltSync(10);



let handleHashPassword = (password) => {
    let hashPassword = bcrypt.hashSync(password, salt)
    return hashPassword
}

const createNewUser = async (data) => {
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'jwt-hoidanit',
        Promise: bluebird
    })
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

const getUserList = async () => {
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'jwt-hoidanit',
        Promise: bluebird
    })


    let users = []
    // connection.query(`SELECT * FROM users`, function (err, results, fields) {
    //     if (err) {
    //         console.log(err)
    //         return users
    //     }
    //     users = results
    //     return users
    // })

    try {
        const [rows, fields] = await connection.execute('SELECT * FROM users')
        console.log('chek rows: ', rows)
        return rows
    } catch (e) {
        console.log(e)
    }
}

module.exports = {
    createNewUser, getUserList
}