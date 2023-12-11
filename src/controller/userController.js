import userApiService from '../service/userApiService'

const readFunc = async (req, res) => {
    try {
        let users = await userApiService.getAllUsers();

        return res.status(200).json({
            EC: users.EC,
            EM: users.EM,
            DT: users.DT
        })
    } catch (e) {
        console.log(e)
        return res.status(200).json({
            EC: 1,
            EM: 'Something went wrong in userController'
        })
    }
}

const createFunc = async (req, res) => {
    try {

    } catch (e) {
        console.log(e)
        return res.status(200).json({
            EC: 1,
            EM: 'Something went wrong in userController'
        })
    }
}

const editFunc = async (req, res) => {
    try {

    } catch (e) {
        console.log(e)
        return res.status(200).json({
            EC: 1,
            EM: 'Something went wrong in userController'
        })
    }
}

const deleteFunc = async (req, res) => {
    try {

    } catch (e) {
        console.log(e)
        return res.status(200).json({
            EC: 1,
            EM: 'Something went wrong in userController'
        })
    }
}

module.exports = {
    createFunc, readFunc, deleteFunc, editFunc
}