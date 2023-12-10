import express from 'express'
import apiController from '../controller/apiController.js'


const router = express.Router()


const initApiRoutes = app => {
    router.get('/api-test', apiController.testApi)
    router.post('/register', apiController.handleRegister)


    return app.use('/api/v1/', router)
}

export default initApiRoutes