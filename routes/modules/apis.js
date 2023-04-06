const express = require('express')
const router = express.Router()

//const user = require('../modules/user')
const transactions = require('../modules/transactions')
const vaults= require('../modules/vaults')
const sign = require('../modules/sign')
const { authenticated } = require('../../middleware/auth')

router.use('/', sign)
//router.use('/users', authenticated, users)
router.use('/transactions', authenticated, transactions)
router.use('/vaults', authenticated, vaults)
module.exports = router