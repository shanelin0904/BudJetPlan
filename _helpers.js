const { Vault } = require('./models')

//轉化SQL原生格式的user物件
function getUser(req) {
    return req.user;
  }
//檢查帳戶幣別和實際幣別是否一致
function checkVaultCurrencyMatch(vaultId, transactionCurrency) {
    if (!vaultId) {
      return true; // 如果沒有vaultId，則視為符合條件
    }
    return Vault.findByPk(vaultId)
      .then(vault => {
        if (!vault) {
          throw new Error(`Vault with id ${vaultId} not found`);
        }
        if (vault.currency !== transactionCurrency) {
          throw new Error(`Vault currency ${vault.currency} does not match transaction currency ${transactionCurrency}`);
        }
        return true; // 如果currency相符，則返回true
      });
  }
  

  module.exports = {
    getUser,
    checkVaultCurrencyMatch
  };