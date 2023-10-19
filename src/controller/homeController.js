
const handleHome = (req, res) => {
    let name = 'tommyle'
    return res.render('home.ejs', { name })
}

const handleUserPage = (req, res) => {
    return res.render('user.ejs')
}

module.exports = {
    handleHome, handleUserPage
}