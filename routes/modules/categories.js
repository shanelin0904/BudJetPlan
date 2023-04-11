const express = require('express')
const router = express.Router()
const {  errorHandler } = require('../../middleware/error-handler')
const categoryController = require('../../controllers/categoryController')

router.get('/:id', categoryController.getCategory, errorHandler)
router.get('/',  categoryController.getCategories, errorHandler)
router.get('/genre/:genre_id', categoryController.getCategoriesByGenreId, errorHandler)
router.post('/',  categoryController.postCategory,  errorHandler)
router.put('/:id', categoryController.updateCategory,  errorHandler)
router.delete('/:id', categoryController.deleteCategory,  errorHandler)

module.exports = router