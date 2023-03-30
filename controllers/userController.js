const userServices = require('../services/user-services')

const userController = {
    register: (req, res) => {
        userServices.register(req, (err, data) => err ? next(err) : res.json({ status: 'success', data }))
    },
    login: (req, res, next) => {
        userServices.login(req, (err, data) => err ? next(err) : res.json({ status: 'success', data }))
    },
    logout: (req, res) => {
        userServices.logout(req, (err, data) => err ?  console.log(err) : res.json({ status: 'success', data }))
    }
}

module.exports = userController