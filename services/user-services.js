const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const { User } = require('../models')
const helpers = require('../_helpers')


const userServices = {
    // 使用者註冊
    register: (req, cb) => {
        const { email, password } = req.body
        let name = req.body.name
        // 驗證name內容是否超過上限字數，若超過則提示
        const nameLengthLimit = 50
        if (name.length > nameLengthLimit) {
            throw new Error(
                `Name的內容超過${nameLengthLimit}字, 請縮短!(${name.length}/${nameLengthLimit})`)
        }
        // 若name未填，default為email
        if (!name) name = email
        console.log(User)
        // 使用者email在資料庫須為唯一，任一已存在資料庫則提示錯誤訊息
        User.findOne({ where: { email } })
            .then((userFindByEmail) => {
                // email註冊，後端驗證唯一性
                if (userFindByEmail) {
                    console.log('Email 已重複註冊！');
                }
                // input驗證OK，bcrypt密碼
                return bcrypt.hash(password, 10)
            })
            .then(hash => {
                // 建立使用者資料
                return User.create({
                    name,
                    email,
                    password: hash
                })
            })
            .then(createdUser => {
                createdUser = createdUser.toJSON()
                // 刪除機敏資訊
                delete createdUser.password
                cb(null, { createdUser })
            })
            .catch(err => cb(err))
    }
    ,
    login: (req, cb) => {
        try {
            // 通過passport local驗證後的user
            const userData = helpers.getUser(req)                    
            // 刪除機敏資訊
            delete userData.password
            // 發送註冊token
            const token = jwt.sign(userData, process.env.JWT_SECRET, { expiresIn: '30d' })
            cb(null, { token, user: userData })
        } catch (err) {
            cb(err)
        }
    },
    logout: (req, cb) => {
        try {
            // 從request header中取得authorization token
            const token = req.headers.authorization.split(' ')[1]
            // 驗證token並將其加入黑名單
            jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
                if (err) throw err
                redisClient.set(decoded.sub, token, 'EX', process.env.JWT_BLACKLIST_TTL)
            })
            cb(null, { message: 'Logout success.' })
        } catch (err) {
            cb(err)
        }
    }
}
module.exports = userServices

// 結束 Redis 連線
//redisClient.quit()