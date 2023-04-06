const vaultServices = require('../services/vault-services')

const vaultController = {
    getVaults: (req, res, next) => {
        vaultServices.getVaults(req, (err, data) => err ? next(err) : res.json({ status: 'success', data }))
    },
    getVault: (req, res, next) => {
        vaultServices.getVault(req, (err, data) => err ? next(err) : res.json({ status: 'success', data }))
    },
    postVault: (req, res, next) => {
        vaultServices.postVault(req, (err, data) => err ?  next(err) : res.json({ status: 'success', data }))
    },
    updateVault: (req, res, next) => {
        vaultServices. updateVault(req, (err, data) => err ? next(err) : res.json({ status: 'success', data }))
    },
    deleteVault: (req, res, next) => {
        vaultServices.deleteVault(req, (err, data) => err ?  next(err) : res.json({ status: 'success', data }))
    }
}

module.exports = vaultController