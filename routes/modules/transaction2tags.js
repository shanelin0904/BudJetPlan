const express = require('express')
const router = express.Router()
const {  errorHandler } = require('../../middleware/error-handler')
const transaction2TagController = require('../../controllers/transaction2TagController')

router.post('/', transaction2TagController.updateTag, errorHandler)

module.exports = router

