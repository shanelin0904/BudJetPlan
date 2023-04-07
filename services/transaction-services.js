const { Transaction, Vault } = require('../models')
const helpers = require('../_helpers')




const transactionServices = {
    getTransactions: (req, cb) => {
        Transaction.findAll({ where: { userId:  helpers.getUser(req).id  } })
            .then(transactions => {
                cb(null, { transactions })
            })
            .catch(err => cb(err))
    },
    getTransactionsByVaultId: (req, cb) => {
        const vaultId = req.params.vault_id
        Vault.findOne({ where: { id: vaultId, userId:  helpers.getUser(req).id  } })
            .then(vault => {
                if (!vault) throw new Error('Vault not found.')
                return Transaction.findAll({ where: { vaultId: vaultId } })
            })
            .then(transactions => {
                cb(null, { transactions })
            })
            .catch(err => cb(err))
    },
    getTransaction: (req, cb) => {
        const transactionId = req.params.id
        Transaction.findOne({ where: { id: transactionId, userId:  helpers.getUser(req).id  } })
            .then(transaction => {
                if (!transaction) throw new Error('Transaction not found.')
                cb(null, { transaction })
            })
            .catch(err => cb(err))
    },
    postTransaction: (req, cb) => {
        const { name, amount, type, currency, date, vaultId } = req.body;
        function createTransaction() {
            Transaction.create({
                name,
                amount,
                type,
                currency: vaultCurrency || currency,
                date,
                userId: helpers.getUser(req).id,
                vaultId
            })
                .then(transaction => {
                    cb(null, { transaction });
                })
                .catch(err => cb(err));
        }
        let vaultCurrency = null;
        
        if (vaultId) {
            Vault.findOne({ _id: vaultId })
                .then(vault => {
                    if (vault) {
                        vaultCurrency = vault.currency;
                    }
                    createTransaction();
                })
                .catch(err => cb(err));
        } else {
            if (!currency) throw new Error('Please enter currency type!.')
            createTransaction();
        }
    
        
    }
    ,
    updateTransaction: (req, cb) => {
        const transactionId = req.params.id
        const { name, amount, currency, type, date,vaultId } = req.body
        Transaction.findOne({ where: { id: transactionId, userId:  helpers.getUser(req).id  } })
            .then(transaction => {
                if (!transaction) throw new Error('Transaction not found.')
                if (transaction.vaultId) throw new Error('You can not change currency of this transaction.')
                if (helpers.checkVaultCurrencyMatch(vaultId, currency)) throw new Error('You can not switch to this vault, beacause curreny does not match.')
                transaction.name = name || transaction.name
                transaction.amount = amount || transaction.amount
                transaction.currency = currency || transaction.currency
                transaction.type = type || transaction.type
                transaction.date = date || transaction.date
                return transaction.save()
            })
            .then(updatedTransaction => {
                cb(null, { transaction: updatedTransaction })
            })
            .catch(err => cb(err))
    },
    deleteTransaction: (req, cb) => {
        const transactionId = req.params.id
        Transaction.findOne({ where: { id: transactionId, userId: helpers.getUser(req).id  } })
            .then(transaction => {
                if (!transaction) throw new Error('Transaction not found.')
                return transaction.destroy()
            })
            .then(() => {
                cb(null, { message: 'Transaction deleted.' })
            })
            .catch(err => cb(err))
    }
}

module.exports = transactionServices
