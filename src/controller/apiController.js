import loginRegisterService from '../service/registerLoginService.js'

const testApi = async (req, res) => {
    return res.status(200).json({
        message: 'ok',
        data: 'test data success'
    })
}

const handleRegister = async (req, res) => {
    try {
        if (!req.body.email) {
            return res.status(200).json({
                EM: 'Missing Email field',
                EC: -1
            })
        }
        if (!req.body.phone) {
            return res.status(200).json({
                EM: 'Missing Phone field',
                EC: -1
            })
        }
        let data = await loginRegisterService.createNewUser(req.body)
        console.log('check data: ', data)
        return res.status(200).json({
            data
        })
    } catch (e) {
        return res.status(200).json({
            EM: 'Something went wrong in apiController',
            EC: -1
        })
    }
}

const handleLogin = async (req, res) => {
    try {
        if (!req.body.phoneOrEmail) {
            return res.status(200).json({
                EM: 'Missing usernameOrEMail in apiController',
                EC: 2
            })
        }
        if (!req.body.password) {
            return res.status(200).json({
                EM: 'Missing password in apiController',
                EC: 2
            })
        }
        let data = await loginRegisterService.checkLogin(req.body)
        if (data && data.DT && data.DT.access_token) {
            res.cookie('jwt', data.DT.access_token, { httpOnly: true, maxAge: 3600000 })
        }
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT
        })
    } catch (e) {
        console.log(e)
        return res.status(200).json({
            EM: 'Something went wrong in apiController',
            EC: 1
        })
    }
}

const handleLogout = async (req, res) => {
    try {
        res.clearCookie('jwt')
        return res.status(200).json({
            EM: 'ok clear cookie',
            EC: 0,
            DT: ''
        })
    } catch (e) {
        console.log(e)
        return res.status(200).json({
            EM: 'Something went wrong in apiController',
            EC: 1
        })
    }
}

module.exports = {
    testApi, handleRegister,
    handleLogin, handleLogout
} 