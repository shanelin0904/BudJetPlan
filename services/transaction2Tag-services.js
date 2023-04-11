const helpers = require('../_helpers')
const { Transaction, Tag, Transaction2tag } = require('../models')

const transaction2TagServices = {
  updateTag: (req, cb) => {
    const { transactionId, addTags = [], removeTags = [] } = req.body
    const userId = helpers.getUser(req).id

    Promise.all([
      Transaction.findOne({ where: { id: transactionId, userId } }),
      Tag.findAll({ where: { id: addTags, userId } }),
      Tag.findAll({ where: { id: removeTags, userId } }),
    ])
      .then(([transaction, addedTags, removedTags]) => {
        if (!transaction) throw new Error('Transaction not found.')
        if (addTags.length > addedTags.length) throw new Error('One or more added tags not found.')
        if (removeTags.length > removedTags.length) throw new Error('One or more removed tags not found.')

        // Add tags
        const addPromises = addedTags.map(tag => {
          return Transaction2tag.findOrCreate({
            where: {
              transactionId,
              tagId: tag.id,
            },
            defaults: {
              transactionId,
              tagId: tag.id,
            },
          })
        })

        // Remove tags
        const removePromises = removedTags.map(tag => {
          return Transaction2tag.destroy({
            where: {
              transactionId,
              tagId: tag.id,
            },
          })
        })

        return Promise.all([...addPromises, ...removePromises])
      })
      .then(([...results]) => cb(null, { results }))
      .catch(err => cb(err))
  },
}

module.exports = transaction2TagServices

