const tagServices = require('../services/tag-services')

const tagController = {
    getTags: (req, res, next) => {
        tagServices.getTags(req, (err, data) => err ? next(err) : res.json({ status: 'success', data }))
    },
    getTag: (req, res, next) => {
        tagServices.getTag(req, (err, data) => err ? next(err) : res.json({ status: 'success', data }))
    },
    postTag: (req, res, next) => {
        tagServices.postTag(req, (err, data) => err ?  next(err) : res.json({ status: 'success', data }))
    },
    updateTag: (req, res, next) => {
        tagServices. updateTag(req, (err, data) => err ? next(err) : res.json({ status: 'success', data }))
    },
    deleteTag: (req, res, next) => {
        tagServices.deleteTag(req, (err, data) => err ?  next(err) : res.json({ status: 'success', data }))
    }
}

module.exports = tagController