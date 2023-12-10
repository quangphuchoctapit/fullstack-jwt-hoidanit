import db from '../models'
import bcrypt from 'bcryptjs'
import { Op } from 'sequelize'
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
        console.log('is existe email ', isExistsEmail)
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
            username: userData.username
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
                return {
                    EM: 'ok! successful login',
                    EC: 0,
                    DT: user.get({ plain: true })
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
    createNewUser, checkLogin
}
