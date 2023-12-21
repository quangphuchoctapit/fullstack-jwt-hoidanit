require('dotenv').config()
import express from 'express';
import initWebRoutes from './routes/web';
import initApiRoutes from './routes/api';
import configViewEngine from './config/viewEngine'
import bodyParser from 'body-parser'
import configCors from './config/cors'
import cookieParser from 'cookie-parser';
const app = express()
const PORT = process.env.PORT || 8081

configCors(app)
configViewEngine(app)

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))

//config cookie parser
app.use(cookieParser())


initWebRoutes(app)
initApiRoutes(app)


app.use((req, res) => {
    return res.send('404 not found')
})
app.listen(PORT, () => {
    console.log("hello ok", PORT)
})