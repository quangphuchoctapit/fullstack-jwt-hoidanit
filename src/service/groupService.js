import db from '../models/index'


const getGroups = async () => {
    try {
        let data = await db.Group.findAll({
            order:
                [['name', 'ASC']]
        })
        return {
            EC: 0,
            EM: 'Get groups successfully',
            DT: data
        }
    } catch (e) {
        console.log(e)
        return {
            EC: -1,
            EM: 'Error in group Service'
        }
    }
}

module.exports = {
    getGroups
}