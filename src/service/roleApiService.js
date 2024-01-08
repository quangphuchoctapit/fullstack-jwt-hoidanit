import db from '../models/index'
import _ from 'lodash'

const createNewRole = async (roles) => {
    try {
        let currentRoles = await db.Role.findAll({
            attributes: ['url', 'description'],
            raw: true
        })
        const persists = roles.filter(({ url: url1 }) => !currentRoles.some(({ url: url2 }) => url2 === url1))

        if (persists.length === 0) {
            return {
                EC: -0,
                EM: 'Nothing to create'
            }
        }
        await db.Role.bulkCreate(roles)
        return {
            EC: 0,
            EM: `successfully created : ${persists.length} roles`
        }
    } catch (e) {
        console.log(e)
        return {
            EM: 'Something went wrong in roleApiService',
            EC: -1,
            DT: []
        }
    }
}

const getAllRoles = async () => {
    try {
        let roles = await db.Role.findAll({
            attributes: ['url', 'description', 'id'],
            raw: true,
            order:
                [['id', 'DESC']]
        })
        if (!roles) {
            return {
                EC: -2,
                EM: `cannot get roles`,
                DT: roles
            }
        }
        return {
            EC: 0,
            EM: `successfully get all roles`,
            DT: roles
        }
    } catch (e) {
        console.log(e)
        return {
            EM: 'Something went wrong in roleApiService',
            EC: -1,
            DT: []
        }
    }
}

const deleteARole = async (inputId) => {
    try {
        let data = await db.Role.findOne({
            where: { id: inputId }
        })
        if (data) {
            data.destroy()
        }
        if (!data) {
            return {
                EM: 'cannot delete this user',
                EC: -2,
            }
        }

        return {
            EM: 'ok deleted a role successfully',
            EC: 0,
            DT: ''
        }
    } catch (e) {
        console.log(e)
        return {
            EM: 'Something went wrong in roleApiService',
            EC: -1,
            DT: []
        }
    }
}

const getRoleByGroup = async (inputId) => {
    try {
        if (!inputId) {
            return {
                EM: 'Missing groupId',
                EC: -2,
                DT: []
            }
        }
        let data = await db.Group.findOne({
            where: { id: inputId },
            include: [{ model: db.Role, attributes: ["id", "url", "description"], through: { attributes: [] } }]

        })
        if (!data) {
            return {
                EM: 'Cannot get role by group',
                EC: -3,
                DT: []
            }
        }
        return {
            EM: 'ok get role by group successfully',
            EC: 0,
            DT: data
        }
    } catch (e) {
        console.log(e)
        return {
            EM: 'Something went wrong in roleApiService',
            EC: -1,
            DT: []
        }
    }
}

module.exports = {
    createNewRole, getAllRoles, deleteARole, getRoleByGroup
}