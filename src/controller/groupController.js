import groupService from '../service/groupService'

const readFunc = async (req, res) => {
    try {
        let data = await groupService.getGroups()
        return res.status(200).json({
            EC: data.EC,
            EM: data.EM,
            DT: data.DT
        })
    } catch (e) {
        console.log(e)
        return res.status(200).json({
            EC: 1,
            EM: 'ERROR in groupController'
        })
    }
}


module.exports = {
    readFunc
}