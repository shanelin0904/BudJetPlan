const express = require('express')
const router = express.Router()
const {  errorHandler } = require('../../middleware/error-handler')
const tagController = require('../../controllers/tagController')

router.get('/:id', tagController.getTag, errorHandler)
router.get('/',  tagController.getTags, errorHandler)
router.post('/', tagController.postTag, errorHandler)
router.put('/:id', tagController.updateTag, errorHandler)
router.delete('/:id', tagController.deleteTag, errorHandler)

module.exports = router