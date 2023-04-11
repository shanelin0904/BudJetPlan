const genreServices = require('../services/genre-services')

const genreController = {
    getGenres: (req, res, next) => {
        genreServices.getGenres(req, (err, data) => err ? next(err) : res.json({ status: 'success', data }))
    }
}

module.exports = genreController