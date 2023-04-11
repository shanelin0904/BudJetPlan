const express = require('express')
const router = express.Router()
const {  errorHandler } = require('../../middleware/error-handler')
const genreController = require('../../controllers/genreController')

router.get('/', genreController.getGenres, errorHandler)


module.exports = router