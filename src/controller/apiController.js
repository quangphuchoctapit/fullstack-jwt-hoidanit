const testApi = async (req, res) => {
    return res.status(200).json({
        message: 'ok',
        data: 'test data success'
    })
}

module.exports = {
    testApi
} 