const { Sequelize } = require('sequelize')

const sequelize = new Sequelize('jwt-hoidanit', 'root', null, {
    host: 'localhost',
    dialect: 'mysql'
})

const connection = async () => {
    try {
        await sequelize.authenticate()
        // console.log('success authenticating')
    } catch (e) {
        console.log('fail authenticating', e)

    }
}

export default connection