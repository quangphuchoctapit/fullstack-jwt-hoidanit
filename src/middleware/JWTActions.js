import jwt from 'jsonwebtoken'
require('dotenv').config()

const allowPath = ['/login', '/register', '/logout']

const createJWT = (payload) => {
    let key = process.env.JWT_SECRET
    let token = null
    try {
        let token = jwt.sign(payload, key, {
            expiresIn: process.env.JWT_EXPIRESIN,
        })
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

const extractToken = req => {
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
        return req.headers.authorization.split(' ')[1]
    }
    // else if (req.query && req.query.token) {
    //     return req.query.token
    // }
    return null
}

const checkUserJWT = async (req, res, next) => {
    if (allowPath.includes(req.path)) return next()

    let cookies = req.cookies
    const tokenFromHeader = extractToken(req)


    if ((cookies && cookies.jwt) || tokenFromHeader) {
        let token = cookies?.jwt ? cookies.jwt : tokenFromHeader
        console.log('cookee: ', cookies)
        let decoded = await verifyToken(token)
        if (decoded) {
            req.user = decoded
            req.token = token
            next()
        }
        else {
            return res.status(401).json({
                EC: -2,
                EM: 'Cannot authenticated user',
                DT: ''
            })
        }
    }
    else {
        return res.status(401).json({
            EC: -1,
            EM: 'Cannot authenticated user',
            DT: ''
        })
    }
}

const checkUserPermission = async (req, res, next) => {
    if (allowPath.includes(req.path) || req.path === '/account') return next()

    if (req.user) {
        let email = req.user.email
        let roles = req.user.groupWithRoles.Roles
        let currentPath = req.path
        if (!roles && roles.length === 0) {
            return res.status(403).json({
                EC: -1,
                EM: 'You do not have permission to access this resource',
                DT: ''
            })
        }
        let canAccess = roles.some((item) => item.url === currentPath || currentPath.includes(item.url))
        let notAccess = roles.some((item) => item.url === currentPath)

        console.log(req.path)
        if (canAccess) {
            next()
        } else {
            return res.status(403).json({
                EC: -2,
                EM: 'You do not have permission to access this resource',
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
    createJWT, verifyToken, checkUserJWT, checkUserPermission
}