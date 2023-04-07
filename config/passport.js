const passport = require('passport')
const LocalStrategy = require('passport-local')
const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const bcrypt = require('bcryptjs')


const { User } = require('../models')

passport.use(new LocalStrategy(
    // customize user field
    {
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    },
    // authenticate user
    (req, email, password, cb) => {
        User.findOne({ where: { email } })
            .then(user => {
                if (!user) return cb(null, false)
                bcrypt.compare(password, user.password)
                    .then(isMatch => {
                        if (!isMatch) return cb(null, false)
                        return cb(null, user.toJSON())
                    })
            })
            .catch(err => cb(err))
    }
))

const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET
}


passport.use(new JwtStrategy(jwtOptions, (jwtPayload, cb) => {
    User.findByPk(jwtPayload.id)
      .then(user => cb(null, user.toJSON()))
      .catch(err => cb(err))
  }))

module.exports = passport