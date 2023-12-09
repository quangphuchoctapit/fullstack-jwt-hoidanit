import express from 'express';
import initWebRoutes from './routes/web';
import configViewEngine from './config/viewEngine'
import bodyParser from 'body-parser'
// import connection from './config/connectDB'
require('dotenv').config()
const app = express()
const PORT = process.env.PORT || 8081

//add headers before the routes are defined
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', process.env.REACT_URL)
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type')
    res.setHeader('Access-Control-Allow-Credentials', true)
    next()
})



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))


// connection()

configViewEngine(app)
initWebRoutes(app)

app.listen(PORT, () => {
    console.log("hello ok", PORT)
})