const transaction2TagServices = require('../services/transaction2Tag-services')

const transaction2TagController = {

   updateTag: (req, res, next) => {
        transaction2TagServices.updateTag(req, (err, data) => err ? next(err) : res.json({ status: 'success', data }))
    }
}

module.exports = transaction2TagController