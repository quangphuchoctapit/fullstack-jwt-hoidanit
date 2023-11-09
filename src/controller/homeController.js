import mysql from 'mysql2'
import userService from '../service/userService'


const handleHome = (req, res) => {
    let name = 'tommyle'
    return res.render('home.ejs', { name })
}

const handleUserPage = async (req, res) => {
    let userList = await userService.getUserList()
    await userService.deleteUser(5)
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


module.exports = {
    handleHome, handleUserPage, handleCreateNewUser, handleDeleteUser
}