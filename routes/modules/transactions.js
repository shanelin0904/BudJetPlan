const express = require('express')
const router = express.Router()
const {  errorHandler } = require('../../middleware/error-handler')
const transactionController = require('../../controllers/transactionController')

router.get('/:id', transactionController.getTransaction, errorHandler)
router.get('/',  transactionController.getTransactions, errorHandler)
router.get('/:vault_id',  transactionController.getTransactionsByVaultId, errorHandler)
router.post('/',  transactionController.postTransaction,  errorHandler)
router.put('/:id', transactionController.updateTransaction,  errorHandler)
router.delete('/:id', transactionController.deleteTransaction,  errorHandler)

module.exports = router