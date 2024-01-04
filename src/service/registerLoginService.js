import db from '../models'
import bcrypt from 'bcryptjs'
import { Op } from 'sequelize'
import { getGroupWithRole } from './JWTService'
require('dotenv').config()
import { createJWT } from '../middleware/JWTActions'
const salt = bcrypt.genSaltSync(10);

let handleHashPassword = (password) => {
    let hashPassword = bcrypt.hashSync(password, salt)
    return hashPassword
}

const checkHashPassword = (inputPassword, hashPassword) => {
    return bcrypt.compareSync(inputPassword, hashPassword)
}

const checkEmailExists = async (userEmail) => {
    let isExists = await db.User.findOne({
        where: { email: userEmail }
    })
    if (isExists) {
        return true
    }
    return false
}

const checkPhoneExists = async (userPhone) => {
    let isExists = await db.User.findOne({
        where: { phone: userPhone }
    })
    if (isExists) {
        return true
    }
    return false
}

const createNewUser = async (userData) => {
    try {
        let isExistsEmail = await checkEmailExists(userData.email)
        if (isExistsEmail) {
            return {
                EM: 'This email already exists',
                EC: -1
            }
        }
        let isExistsPhone = await checkPhoneExists(userData.phone)
        if (isExistsPhone) {
            return {
                EM: 'This phone number already exists',
                EC: -1
            }
        }
        if (userData.password && userData.password.length < 5) {
            return {
                EM: 'Password must be at least 5 characters',
                EC: -1
            }
        }
        let hashPassword = handleHashPassword(userData.password)

        await db.User.create({
            email: userData.email,
            phone: userData.phone,
            password: hashPassword,
            username: userData.username,
            groupId: 5
        })

        return {
            EM: 'You have successfully created a new account',
            EC: 0
        }
    } catch (e) {
        console.log(e)
        return {
            EC: -2,
            EM: 'Something wrong in registerLoginService'
        }
    }
}

const checkLogin = async (userData) => {
    try {
        let user = await db.User.findOne({
            where: {
                [Op.or]: [
                    { email: userData.phoneOrEmail },
                    { phone: userData.phoneOrEmail }
                ]
            }
        })
        if (user) {
            let isCorrectPassword = checkHashPassword(userData.password, user.password)
            if (isCorrectPassword === true) {
                let groupWithRoles = await getGroupWithRole(user)
                let payload = {
                    email: user.email,
                    groupWithRoles: groupWithRoles,
                    username: user.username
                }
                let token = await createJWT(payload)
                return {
                    EM: 'ok! successful login',
                    EC: 0,
                    DT: {
                        access_token: token,
                        groupWithRoles: groupWithRoles,
                        email: user.email,
                        username: user.username
                    }
                }
            }
        }
        return {
            EM: 'This email/phone or password is not found',
            EC: 2,
            DT: ''
        }
    } catch (e) {
        console.log(e)
        return {
            EC: -2,
            EM: 'Something wrong in registerLoginService'
        }
    }
}

module.exports = {
    createNewUser, checkLogin, checkHashPassword,
    checkEmailExists,
    checkPhoneExists
}
