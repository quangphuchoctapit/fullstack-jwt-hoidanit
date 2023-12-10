import express from 'express';
import initWebRoutes from './routes/web';
import initApiRoutes from './routes/api';
import configViewEngine from './config/viewEngine'
import bodyParser from 'body-parser'
import configCors from './config/cors'
// import connection from './config/connectDB'
require('dotenv').config()
const app = express()
const PORT = process.env.PORT || 8081

configCors(app)
configViewEngine(app)

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))

initWebRoutes(app)
initApiRoutes(app)

app.listen(PORT, () => {
    console.log("hello ok", PORT)
})