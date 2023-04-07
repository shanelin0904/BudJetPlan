const express = require('express')
const router = express.Router()

const vaultController = require('../../controllers/vaultController')
const {  errorHandler } = require('../../middleware/error-handler')

router.get('/:id', vaultController.getVault, errorHandler)
router.get('/',  vaultController.getVaults, errorHandler)
router.post('/', vaultController.postVault, errorHandler)
router.put('/:id', vaultController.updateVault, errorHandler)
router.delete('/:id', vaultController.deleteVault, errorHandler)

module.exports = router