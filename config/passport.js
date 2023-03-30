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
    User.findByPk(jwtPayload.id, {})
        .then(user => {
            redisClient.exists(user.token, (err, reply) => {
                if (err) throw err
                if (reply === 1) {
                    // token 存在於黑名單中，拒絕訪問
                    return cb(null, false)
                } else {
                    // token 未被加入黑名單，允許訪問
                    return cb(null, user.toJSON())
                }
            })
        })
        .catch(err => cb(err))
}))

module.exports = passport