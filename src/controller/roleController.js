import roleApiService from '../service/roleApiService.js'
import userApiService from '../service/userApiService'

const readFunc = async (req, res) => {
    try {
        // let users = await roleApiService.createNewRole(req.body);

        let data = await roleApiService.getAllRoles()
        return res.status(200).json({
            EC: data.EC,
            EM: data.EM,
            DT: data.DT
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
        let data = await roleApiService.createNewRole(req.body)

        return res.status(200).json({
            EC: data.EC,
            EM: data.EM
        })
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
        // let editUser = await userApiService.editUser(req.body);
        console.log('check body: ', req.body)
        return res.status(200).json({
            EC: editUser.EC,
            EM: editUser.EM
        })
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
        let deleteUser = await roleApiService.deleteARole(req.body.id);
        return res.status(200).json({
            EC: deleteUser.EC,
            EM: deleteUser.EM
        })
    } catch (e) {
        console.log(e)
        return res.status(200).json({
            EC: 1,
            EM: 'Something went wrong in userController'
        })
    }
}

// const getUserAccount = async (req, res) => {
//     try {
//         return res.status(200).json({
//             EM: 'ok',
//             EC: 0,
//             DT: {
//                 access_token: req.token,
//                 groupWithRoles: req.user.groupWithRoles,
//                 email: req.user.email,
//                 username: req.user.username
//             }
//         })
//     } catch (e) {
//         return res.status(200).json({
//             EM: 'Something went wrong in apiController',
//             EC: -1
//         })
//     }
// }

module.exports = {
    createFunc, readFunc, deleteFunc, editFunc
}