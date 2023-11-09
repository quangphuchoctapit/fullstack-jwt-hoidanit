import express from 'express';
import initWebRoutes from './routes/web';
import configViewEngine from './config/viewEngine'
import bodyParser from 'body-parser'
require('dotenv').config()
const app = express()
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))
const PORT = process.env.PORT || 8081

configViewEngine(app)
initWebRoutes(app)

app.listen(PORT, () => {
    console.log("hello ok", PORT)
})