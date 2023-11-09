import mysql from 'mysql2'
import userService from '../service/userService'


const handleHome = (req, res) => {
    let name = 'tommyle'
    return res.render('home.ejs', { name })
}

const handleUserPage = async (req, res) => {
    let userList = await userService.getUserList()
    return res.render('user.ejs', { userList })
}

const handleCreateNewUser = async (req, res) => {

    let data = userService.createNewUser(req.body)
    let listUsers = await userService.getUserList()
    console.log('cheks list user: ', listUsers)
    return res.status(200).json(data)
}

const getUserList = (req, res) => {

}

module.exports = {
    handleHome, handleUserPage, handleCreateNewUser
}