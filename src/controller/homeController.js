import mysql from 'mysql2'
import userService from '../service/userService'


const handleHome = (req, res) => {
    let name = 'tommyle'
    return res.render('home.ejs', { name })
}

const handleUserPage = (req, res) => {
    return res.render('user.ejs')
}

const handleCreateNewUser = (req, res) => {

    let data = userService.createNewUser(req.body)
    userService.getUserList()
    return res.status(200).json(data)
}

const getUserList = (req, res) => {

}

module.exports = {
    handleHome, handleUserPage, handleCreateNewUser
}