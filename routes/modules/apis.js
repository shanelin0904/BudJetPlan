const express = require('express')
const router = express.Router()

//const user = require('../modules/user')
const transactions = require('../modules/transactions')
const vaults= require('../modules/vaults')
const categories = require('../modules/categories')
const tags = require('../modules/tags')
const genres = require('../modules/genres')
const transaction2tags = require('../modules/transaction2tags')
const sign = require('../modules/sign')
const { authenticated } = require('../../middleware/auth')

router.use('/', sign)
//router.use('/users', authenticated, users)
router.use('/transactions', authenticated, transactions)
router.use('/vaults', authenticated, vaults)
router.use('/categories', authenticated, categories)
router.use('/tags', authenticated, tags)
router.use('/transaction2tags', authenticated, transaction2tags)
router.use('/genres', authenticated, genres)

module.exports = router