import express from 'express';
import initWebRoutes from './routes/web';
import initApiRoutes from './routes/api';
import configViewEngine from './config/viewEngine'
import bodyParser from 'body-parser'
import configCors from './config/cors'
import { createJWT, verifyToken } from './middleware/JWTActions'
// import connection from './config/connectDB'
require('dotenv').config()
const app = express()
const PORT = process.env.PORT || 8081

configCors(app)
configViewEngine(app)

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))

// createJWT()
// let tokenDecoded = verifyToken('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoidG9tbXkiLCJibGEiOiJibGEiLCJpYXQiOjE3MDI3ODY0MzN9.RYuC1AFh4rnDNLD5w6oMkmbasmm5WXhZ9a2yeoUhGBc')
// console.log('chec ktoekn: ', tokenDecoded)
initWebRoutes(app)
initApiRoutes(app)

app.listen(PORT, () => {
    console.log("hello ok", PORT)
})