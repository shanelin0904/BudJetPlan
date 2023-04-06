const chai = require('chai')
const chaiHttp = require('chai-http')
const app = require('../app')
const { Transaction } = require('../models')
const expect = chai.expect

chai.use(chaiHttp)

describe('Transaction API', () => {
  // 邊緣測試
  describe('Edge Cases', () => {
    it('should return 404 for invalid transaction ID', async () => {
      const res = await chai.request(app).get('/transactions/999')
      expect(res).to.have.status(404)
    })

    it('should return 400 for invalid transaction data', async () => {
      const res = await chai.request(app)
        .post('/transactions')
        .send({ description: 'Test Transaction', amount: 'not a number' })
      expect(res).to.have.status(400)
    })
  })

  // 基本功能
  describe('Basic Functionality', () => {
    beforeEach(async () => {
      await Transaction.destroy({ where: {} })
      await Transaction.create({ description: 'Transaction 1', amount: 100 })
      await Transaction.create({ description: 'Transaction 2', amount: -50 })
    })

    it('should get all transactions', async () => {
      const res = await chai.request(app).get('/transactions')
      expect(res).to.have.status(200)
      expect(res.body).to.be.an('array')
      expect(res.body.length).to.equal(2)
    })

    it('should get a transaction by ID', async () => {
      const transactions = await Transaction.findAll()
      const transactionId = transactions[0].id
      const res = await chai.request(app).get(`/transactions/${transactionId}`)
      expect(res).to.have.status(200)
      expect(res.body).to.be.an('object')
      expect(res.body.id).to.equal(transactionId)
    })

    it('should create a new transaction', async () => {
      const res = await chai.request(app)
        .post('/transactions')
        .send({ description: 'New Transaction', amount: 50 })
      expect(res).to.have.status(201)
      expect(res.body).to.be.an('object')
      expect(res.body.description).to.equal('New Transaction')
      expect(res.body.amount).to.equal(50)
    })

    it('should update a transaction', async () => {
      const transactions = await Transaction.findAll()
      const transactionId = transactions[0].id
      const res = await chai.request(app)
        .put(`/transactions/${transactionId}`)
        .send({ description: 'Updated Transaction', amount: 200 })
      expect(res).to.have.status(200)
      expect(res.body).to.be.an('object')
      expect(res.body.id).to.equal(transactionId)
      expect(res.body.description).to.equal('Updated Transaction')
      expect(res.body.amount).to.equal(200)
    })

    it('should delete a transaction', async () => {
      const transactions = await Transaction.findAll()
      const transactionId = transactions[0].id
      const res = await chai.request(app).delete(`/transactions/${transactionId}`)
      expect(res).to.have.status(204)
      const deletedTransaction = await Transaction.findByPk(transactionId)
      expect(deletedTransaction).to.be.null
    })
  })
})
