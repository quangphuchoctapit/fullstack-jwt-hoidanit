import mysql from 'mysql2'
import userService from '../service/userService'


const handleHome = (req, res) => {
    let name = 'tommyle'
    return res.render('home.ejs', { name })
}

const handleUserPage = async (req, res) => {
    let userList = await userService.getUserList()
    console.log('cookies: ', req.cookies)
    console.log('signed cookies: ', req.signedCookies)

    return res.render('user.ejs', { userList })
}

const handleCreateNewUser = async (req, res) => {

    let data = userService.createNewUser(req.body)
    return res.redirect('/user')
}

const handleDeleteUser = async (req, res) => {
    await userService.deleteUser(req.params.id)
    return res.redirect('/user')
}

const handleGetUpdateUser = async (req, res) => {
    try {
        let userData = {}

        let id = req.params.id
        let user = await userService.getUserById(id)

        userData = {}
        userData = user
        // if (user && user.length > 0) {
        //     userData = user[0]
        // }
        return res.render('updateUser.ejs', { userData })
    } catch (e) {
        console.log(e)
    }
}

const handleUpdateUser = async (req, res) => {
    try {
        let email = req.body.email
        let username = req.body.username
        let id = req.body.id
        await userService.updateUserInfo(email, username, id)
        return res.redirect('/user')
    } catch (e) {
        console.log(e)
    }
}

module.exports = {
    handleHome, handleUserPage, handleCreateNewUser, handleDeleteUser, handleGetUpdateUser, handleUpdateUser
}