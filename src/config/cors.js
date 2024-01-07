require('dotenv').config()

//add headers before the routes are defined
const configCors = (app) => {
    app.use(function (req, res, next) {
        res.setHeader('Access-Control-Allow-Origin', process.env.REACT_URL)
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type, Authorization')
        res.setHeader('Access-Control-Allow-Credentials', true)
        console.log('check :', req.method === 'OPTIONS')
        if (req.method === 'OPTIONS') {
            return res.sendStatus(200)
        }
        next()
    })
}
export default configCors