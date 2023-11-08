import mysql from 'mysql2'

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'jwt-hoidanit'
})


const handleHome = (req, res) => {
    let name = 'tommyle'
    return res.render('home.ejs', { name })
}

const handleUserPage = (req, res) => {
    return res.render('user.ejs')
}

const handleCreateNewUser = (req, res) => {
    let username = req.body.username
    let email = req.body.email
    let password = req.body.password
    connection.query(`INSERT INTO users (username, email, password) values(?, ?, ?)`, [username, email, password], function (err, results, fields) {
        if (err) {
            console.log(err)
        }
    })

    return res.send("ok")
}

module.exports = {
    handleHome, handleUserPage, handleCreateNewUser
}