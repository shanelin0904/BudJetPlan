const { Genre } = require('../models');

const genreServices = {
    getGenres: (req, cb) => {
        Genre.findAll({})
            .then(genres => {
                cb(null, { genres });
            })
            .catch(err => cb(err));
    }
};


module.exports = genreServices;