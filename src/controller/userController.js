import userApiService from '../service/userApiService'

const readFunc = async (req, res) => {
    try {
        if (req.query.page && req.query.limit) {
            let page = req.query.page
            let limit = req.query.limit
            let users = await userApiService.getAllUsersWithPagination(+page, +limit);

            return res.status(200).json({
                EC: users.EC,
                EM: users.EM,
                DT: users.DT
            })
        } else {
            let users = await userApiService.getAllUsers();

            return res.status(200).json({
                EC: users.EC,
                EM: users.EM,
                DT: users.DT
            })
        }
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
        let data = await userApiService.createNewUser(req.body)
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
        let editUser = await userApiService.editUser(req.body);
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
        let deleteUser = await userApiService.deleteAUser(req.body.id);
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

module.exports = {
    createFunc, readFunc, deleteFunc, editFunc
}