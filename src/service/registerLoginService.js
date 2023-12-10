import db from '../models'
import bcrypt from 'bcryptjs'
const salt = bcrypt.genSaltSync(10);


let handleHashPassword = (password) => {
    let hashPassword = bcrypt.hashSync(password, salt)
    return hashPassword
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

module.exports = {
    createNewUser
}
