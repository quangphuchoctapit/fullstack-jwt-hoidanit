import db from '../models/index'

const getAllUsers = async () => {
    try {
        let users = await db.User.findAll({
            attributes: ['id', 'username', 'email', 'phone', 'sex'],
            include: { model: db.Group, attributes: ['name', 'description'] }
        })
        if (users) {
            return {
                EM: 'Get Data successfully',
                EC: 0,
                DT: users
            }
        } else {
            return {
                EM: 'no result',
                EC: 0,
                DT: []
            }
        }
    } catch (e) {
        console.log(e)
        return {
            EM: 'Something went wrong in userApiService',
            EC: -1,
            DT: []
        }
    }
}

const createNewUser = async () => {
    try {
        await db.User.create({

        })
    } catch (e) {
        console.log(e)
        return {
            EM: 'Something went wrong in userApiService',
            EC: -1,
            DT: []
        }
    }
}

const editUser = async (data) => {
    try {
        let user = await db.User.findOne({
            where: {
                id: data.id
            }
        })
        if (user) {
            // found user
            // user.save()
        }
    } catch (e) {
        console.log(e)
        return {
            EM: 'Something went wrong in userApiService',
            EC: -1,
            DT: []
        }
    }
}

const deleteUser = async (id) => {
    try {
        await db.User.delete({
            where: { id: id }
        })
    } catch (e) {
        console.log(e)
        return {
            EM: 'Something went wrong in userApiService',
            EC: -1,
            DT: []
        }
    }
}

module.exports = {
    getAllUsers, createNewUser, editUser, deleteUser
}