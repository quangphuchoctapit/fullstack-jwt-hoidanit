import mysql from 'mysql2/promise'
import bluebird from 'bluebird'
import bcrypt from 'bcryptjs'
const salt = bcrypt.genSaltSync(10);
import db from '../models'


let handleHashPassword = (password) => {
    let hashPassword = bcrypt.hashSync(password, salt)
    return hashPassword
}

const createNewUser = async (data) => {
    // const connection = await mysql.createConnection({
    //     host: 'localhost',
    //     user: 'root',
    //     password: '',
    //     database: 'jwt-hoidanit',
    //     Promise: bluebird
    // })
    let username = data.username
    let email = data.email
    let password = data.password
    let hashPassword = handleHashPassword(password)
    try {
        await db.User.create({
            username: username,
            email: email,
            password: hashPassword
        })
    } catch (e) {
        console.log(e)
    }

}

const getUserList = async () => {
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'jwt-hoidanit',
        Promise: bluebird
    })
    let user = []
    try {
        const [rows, fields] = await connection.execute('SELECT * FROM user')
        user = rows
        return user
    } catch (e) {
        console.log(e)
    }
}

const deleteUser = async (id) => {
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'jwt-hoidanit',
        Promise: bluebird
    })
    try {
        const [rows, fields] = await connection.execute('delete from user where id = ?', [id])
    } catch (e) {
        console.log(e)
    }
}

const getUserById = async (id) => {
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'jwt-hoidanit',
        Promise: bluebird
    })
    try {
        const [rows, fields] = await connection.execute('select * from user where id = ?', [id])
        return rows
    } catch (e) {
        console.log(e)
    }
}

const updateUserInfo = async (email, username, userid) => {
    let id = userid
    if (!userid) {
        console.log('missing id')
    }
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'jwt-hoidanit',
        Promise: bluebird
    })
    try {
        const [rows, fields] = await connection.execute('update user set email = ?, username = ? where id = ?', [email, username, id])
        return rows
    } catch (e) {
        console.log(e)
    }
}

module.exports = {
    createNewUser, getUserList, deleteUser, getUserById, updateUserInfo
}