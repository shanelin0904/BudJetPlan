const express = require('express')
const router = express.Router()
const passport = require('passport')
const userController = require('../../controllers/userController')
const { loginFail } = require('../../middleware/error-handler')

router.post('/register', userController.register)
router.post('/login', passport.authenticate('local', { session: false, failWithError: true }), userController.login, loginFail)
router.post('/logout', userController.logout)
module.exports = router