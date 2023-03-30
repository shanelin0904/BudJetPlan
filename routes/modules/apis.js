const express = require('express')
const router = express.Router()

//const user = require('../modules/user')
//const transaction = require('../modules/transaction')

const sign = require('../modules/sign')
const { authenticated } = require('../../middleware/auth')

router.use('/', sign)
//router.use('/users', authenticated, users)
//router.use('/transactions', authenticated, transactions)

module.exports = router