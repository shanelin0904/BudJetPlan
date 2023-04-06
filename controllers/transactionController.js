const transactionServices = require('../services/transaction-services')

const transactionController = {
    getTransactions: (req, res, next) => {
        transactionServices.getTransactions(req, (err, data) => err ? next(err) : res.json({ status: 'success', data }))
    },
    getTransaction: (req, res, next) => {
        transactionServices.getTransaction(req, (err, data) => err ? next(err) : res.json({ status: 'success', data }))
    },
    getTransactionsByVaultId: (req, res, next) => {
        transactionServices.getTransactionsByVaultId(req, (err, data) => err ? next(err) : res.json({ status: 'success', data }))
    },
    postTransaction: (req, res, next) => {
        transactionServices.postTransaction(req, (err, data) => err ? next(err) : res.json({ status: 'success', data }))
    },
    updateTransaction: (req, res, next) => {
        transactionServices. updateTransaction(req, (err, data) => err ?  next(err) : res.json({ status: 'success', data }))
    },
    deleteTransaction: (req, res, next) => {
        transactionServices.deleteTransaction(req, (err, data) => err ?  next(err) : res.json({ status: 'success', data }))
    }
}

module.exports = transactionController