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

const getAllUsersWithPagination = async (page, limit) => {
    try {
        let offset = (page - 1) * limit
        const { count, rows } = await db.User.findAndCountAll({
            offset: offset,
            limit: limit,
            attributes: ['id', 'username', 'email', 'phone', 'sex'],
            include: { model: db.Group, attributes: ['name', 'description'] }
        })
        let totalPages = Math.ceil(count / limit)
        let data = {
            totalRows: count,
            totalPages: totalPages,
            users: rows
        }
        return {
            EM: 'ok',
            EC: 0,
            DT: data
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

const deleteAUser = async (id) => {
    try {
        if (!id) {
            return {
                EC: -3,
                EM: 'Missing param'
            }
        }
        let user = await db.User.findOne({
            where: { id: id }
        })
        if (user) {
            await user.destroy()
            return {
                EC: 0,
                EM: 'Successfully deleted a user'
            }
        }
        return {
            EC: -2,
            EM: 'Cannot delete a user'
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

module.exports = {
    getAllUsers, getAllUsersWithPagination, createNewUser, editUser, deleteAUser
}