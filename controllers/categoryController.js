const categoryServices = require('../services/category-services')

const categoryController = {
    getCategories: (req, res, next) => {
        categoryServices.getCategories(req, (err, data) => err ? next(err) : res.json({ status: 'success', data }))
    },
    getCategory: (req, res, next) => {
        categoryServices.getCategory(req, (err, data) => err ? next(err) : res.json({ status: 'success', data }))
    }, 
    getCategoriesByGenreId: (req, res, next) => {
        categoryServices.getCategoriesByGenreId(req, (err, data) => err ? next(err) : res.json({ status: 'success', data }))
    },
    postCategory: (req, res, next) => {
        categoryServices.postCategory(req, (err, data) => err ? next(err) : res.json({ status: 'success', data }))
    },
    updateCategory: (req, res, next) => {
        categoryServices.updateCategory(req, (err, data) => err ? next(err) : res.json({ status: 'success', data }))
    },
    deleteCategory: (req, res, next) => {
        categoryServices.deleteCategory(req, (err, data) => err ? next(err) : res.json({ status: 'success', data }))
    }
}

module.exports = categoryController