import express from 'express';
import initWebRoutes from './routes/web';
import configViewEngine from './config/viewEngine'
import bodyParser from 'body-parser'
// import connection from './config/connectDB'
require('dotenv').config()
const app = express()
const PORT = process.env.PORT || 8081

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))


// connection()

configViewEngine(app)
initWebRoutes(app)

app.listen(PORT, () => {
    console.log("hello ok", PORT)
})