import express from 'express'
import homeController from '../controller/homeController'
import apiController from '../controller/apiController.js'


const router = express.Router()


const initWebRoutes = app => {
    router.get('/', (homeController.handleHome))
    router.get('/user', homeController.handleUserPage)
    router.post('/users/create-user', homeController.handleCreateNewUser)
    router.post('/delete-user/:id', homeController.handleDeleteUser)
    router.get('/update-user/:id', homeController.handleGetUpdateUser)
    router.post('/update-user', homeController.handleUpdateUser)


    router.get('/api/api-test', apiController.testApi)
    return app.use('/', router)
}

export default initWebRoutes