import express from 'express'
import apiController from '../controller/apiController.js'
import userController from '../controller/userController.js'
import roleController from '../controller/roleController.js'

import groupController from '../controller/groupController.js'
import { checkUserJWT, checkUserPermission } from '../middleware/JWTActions.js'


const router = express.Router()


const initApiRoutes = app => {
    router.all('*', checkUserJWT, checkUserPermission)

    router.get('/api-test', apiController.testApi)
    router.post('/register', apiController.handleRegister)
    router.post('/login', apiController.handleLogin)
    router.post('/logout', apiController.handleLogout)


    router.get('/account', userController.getUserAccount)


    //user routes
    router.get('/user/read', checkUserJWT, userController.readFunc)
    router.post('/user/create', userController.createFunc)
    router.put('/user/edit', userController.editFunc)
    router.delete('/user/delete', userController.deleteFunc)

    // role routes
    router.get('/role/read', roleController.readFunc)
    router.post('/role/create', roleController.createFunc)
    router.put('/role/edit', roleController.editFunc)
    router.delete('/role/delete', roleController.deleteFunc)

    //group routes
    router.get('/group/read', groupController.readFunc)


    return app.use('/api/v1/', router)
}

export default initApiRoutes