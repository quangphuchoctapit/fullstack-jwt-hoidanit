import jwt from 'jsonwebtoken'
require('dotenv').config()

const createJWT = (payload) => {
    let key = process.env.JWT_SECRET
    let token = null
    try {
        let token = jwt.sign(payload, key)
        return token
    } catch (e) {
        console.log(e)
    }
    return token
}

const verifyToken = async (token) => {
    let key = process.env.JWT_SECRET
    let decoded = null
    try {
        decoded = await jwt.verify(token, key)
    } catch (e) {
        console.log(e)
    }
    return decoded
}

const checkUserJWT = async (req, res, next) => {
    let cookies = req.cookies
    if (cookies && cookies.jwt) {
        let token = cookies.jwt
        let decoded = await verifyToken(token)
        console.log('check decoded: ', decoded)
        if (decoded) {
            next()
        }
        else {
            return res.status(401).json({
                EC: -2,
                EM: 'Cannot authenticated user',
                DT: ''
            })
        }
    } else {
        return res.status(401).json({
            EC: -1,
            EM: 'Cannot authenticated user',
            DT: ''
        })
    }
}

module.exports = {
    createJWT, verifyToken, checkUserJWT
}