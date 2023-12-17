import jwt from 'jsonwebtoken'
require('dotenv').config()

const createJWT = () => {
    let key = process.env.JWT_SECRET
    let payload = { name: 'tommy', bla: 'bla' }
    let token = null
    try {
        let token = jwt.sign(payload, key)
        console.log('check token: ', token)
    } catch (e) {
        console.log(e)
    }
    return token
}

const verifyToken = async (token) => {
    let key = process.env.JWT_SECRET
    let data = null
    try {
        let decoded = jwt.verify(token, 'sa')
        data = decoded
    } catch (e) {
        console.log(e)
    }
    return data
}

module.exports = {
    createJWT, verifyToken
}