const testApi = async (req, res) => {
    return res.status(200).json({
        message: 'ok',
        data: 'test data success'
    })
}

const register = async (req, res) => {
    console.log('call me', req.body)
}

module.exports = {
    testApi, register
} 