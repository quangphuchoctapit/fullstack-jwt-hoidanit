import express from 'express'
import apiController from '../controller/apiController.js'
import userController from '../controller/userController.js'


const router = express.Router()


const initApiRoutes = app => {
    router.get('/api-test', apiController.testApi)
    router.post('/register', apiController.handleRegister)
    router.post('/login', apiController.handleLogin)

    router.get('/user/read', userController.readFunc)
    router.post('/user/create', userController.createFunc)
    router.put('/user/edit', userController.editFunc)
    router.delete('/user/delete', userController.deleteFunc)

    return app.use('/api/v1/', router)
}

export default initApiRoutes