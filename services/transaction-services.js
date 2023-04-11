const { Transaction, Vault, Transaction2tag, Tag} = require('../models')
const helpers = require('../_helpers')




const transactionServices = {
    getTransactions: (req, cb) => {
        Transaction.findAll({ where: { userId: helpers.getUser(req).id } })
            .then(transactions => {
                cb(null, { transactions })
            })
            .catch(err => cb(err))
    },
    getTransactionsByVaultId: (req, cb) => {
        const vaultId = req.params.vault_id
        Vault.findOne({ where: { id: vaultId, userId: helpers.getUser(req).id } })
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
        Transaction.findOne({ where: { id: transactionId, userId: helpers.getUser(req).id } })
            .then(transaction => {
                if (!transaction) throw new Error('Transaction not found.')
                cb(null, { transaction })
            })
            .catch(err => cb(err))
    },
    postTransaction: (req, cb) => {
        const { name, amount, type, currency, date, vaultId, categoryId, tags = [] } = req.body;
        function createTransaction() {
            Transaction.create({
                name,
                amount,
                type,
                currency: vaultCurrency || currency,
                date,
                userId: helpers.getUser(req).id,
                vaultId,
                categoryId

            })
                .then(transaction => {
                    // If there are tags, create multiple Transaction2Tag records
                    if (tags.length > 0) {
                        return Tag.findAll({ where: { id: tags, userId: helpers.getUser(req).id } })
                            .then((foundTags) => {
                                if (foundTags.length !== tags.length) {
                                    throw new Error('One or more tags not found.')
                                }
                                const transaction2tags = foundTags.map((tag) => {
                                    return {
                                        transactionId: transaction.id,
                                        tagId: tag.id,
                                    }
                                })
                                return Transaction2tag.bulkCreate(transaction2tags)
                                    .then(() => {
                                        cb(null, { transaction });
                                    })
                            })
                    } else {
                        cb(null, { transaction });
                    }
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
        const { name, amount, currency, type, date, vaultId, categoryId, addTags = [], removeTags = [] } = req.body

        Transaction.findOne({ where: { id: transactionId, userId: helpers.getUser(req).id } })
            .then(transaction => {
                if (!transaction) throw new Error('Transaction not found.')
                if (transaction.vaultId) throw new Error('You cannot change currency of this transaction.')
                if (helpers.checkVaultCurrencyMatch(vaultId, currency)) throw new Error('You cannot switch to this vault, because currency does not match.')

                transaction.name = name ?? transaction.name
                transaction.amount = amount ?? transaction.amount
                transaction.currency = currency ?? transaction.currency
                transaction.type = type ?? transaction.type
                transaction.date = date ?? transaction.date
                transaction.categoryId = categoryId ?? transaction.categoryId
                transaction.vaultId = vaultId ?? transaction.vaultId

                return Promise.all([
                    transaction.save(),
                    Transaction2tag.findAll({ where: { transactionId } }),
                    Tag.findAll({ where: { id: addTags, userId: helpers.getUser(req).id } }),
                    Tag.findAll({ where: { id: removeTags, userId: helpers.getUser(req).id } })
                ])
            })
            .then(([updatedTransaction, addedTags, removedTags]) => {
                // Add tags
                const addPromises = addedTags.map(tag => {
                    return Transaction2tag.findOrCreate({
                        where: {
                            transactionId: updatedTransaction.id,
                            tagId: tag.id,
                        },
                        defaults: {
                            transactionId: updatedTransaction.id,
                            tagId: tag.id,
                        },
                    })
                })

                // Remove tags
                const removePromises = removedTags.map(tag => {
                    return Transaction2tag.destroy({
                        where: {
                            transactionId: updatedTransaction.id,
                            tagId: tag.id,
                        },
                    })
                })

                return Promise.all([...addPromises, ...removePromises])
                    .then(() => {
                        return updatedTransaction
                    })
            })
            .then(updatedTransaction => {
                cb(null, { transaction: updatedTransaction })
            })
            .catch(err => cb(err))
    }
    ,
    deleteTransaction: (req, cb) => {
        const transactionId = req.params.id
        Transaction.findOne({ where: { id: transactionId, userId: helpers.getUser(req).id } })
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
