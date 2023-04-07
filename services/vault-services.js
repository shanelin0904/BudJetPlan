const { Vault } = require('../models');
const helpers = require('../_helpers');

const vaultServices = {
  getVaults: (req, cb) => {
    Vault.findAll({ where: { userId:  helpers.getUser(req).id} })
      .then(vaults => {
        cb(null, { vaults });
      })
      .catch(err => cb(err));
  },
  getVault: (req, cb) => {
    const vaultId = req.params.id;
    Vault.findOne({ where: { id: vaultId, userId:  helpers.getUser(req).id } })
      .then(vault => {
        if (!vault) throw new Error('Vault not found.');
        cb(null, { vault });
      })
      .catch(err => cb(err));
  },
  postVault: (req, cb) => {
    const { name, description, currency } = req.body;
    Vault.create({
      name,
      description,
      currency,
      userId:  helpers.getUser(req).id
    })
      .then(vault => {
        cb(null, { vault });
      })
      .catch(err => cb(err));
  },
  updateVault: (req, cb) => {
    const vaultId = req.params.id;
    const { name, description, currency } = req.body;
    Vault.findOne({ where: { id: vaultId, userId:  helpers.getUser(req).id } })
      .then(vault => {
        if (!vault) throw new Error('Vault not found.');
        vault.name = name || vault.name;
        vault.description = description || vault.description;
        vault.currency = currency || vault.currency;
        return vault.save();
      })
      .then(updatedVault => {
        cb(null, { vault: updatedVault });
      })
      .catch(err => cb(err));
  },
  deleteVault: (req, cb) => {
    const vaultId = req.params.id;
    Vault.findOne({ where: { id: vaultId, userId:  helpers.getUser(req).id } })
      .then(vault => {
        if (!vault) throw new Error('Vault not found.');
        return vault.destroy();
      })
      .then(() => {
        cb(null, { message: 'Vault deleted.' });
      })
      .catch(err => cb(err));
  }
};

module.exports = vaultServices;
