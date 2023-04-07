'use strict'

const { expect } = require('chai')
const { Transaction } = require('../../models')

describe('Transaction Model', () => {
  it('should create a new transaction with valid attributes', async () => {
    const transaction = await Transaction.create({
      name: 'Test Transaction',
      date: '2022-01-01',
      amount: 1000,
      type: 'income',
    })

    expect(transaction).to.be.an('object')
    expect(transaction.name).to.equal('Test Transaction')
    expect(transaction.date).to.equal('2022-01-01')
    expect(transaction.amount).to.equal(1000)
    expect(transaction.type).to.equal('income')
  })

  it('should not create a transaction without a name', async () => {
    let error = null

    try {
      await Transaction.create({
        date: '2022-01-01',
        amount: 1000,
        type: 'income',
      })
    } catch (e) {
      error = e
    }

    expect(error).to.exist
    expect(error.message).to.include('notNull Violation: Transaction.name cannot be null')
  })

  it('should not create a transaction without a date', async () => {
    let error = null

    try {
      await Transaction.create({
        name: 'Test Transaction',
        amount: 1000,
        type: 'income',
      })
    } catch (e) {
      error = e
    }

    expect(error).to.exist
    expect(error.message).to.include('notNull Violation: Transaction.date cannot be null')
  })

  it('should not create a transaction without an amount', async () => {
    let error = null

    try {
      await Transaction.create({
        name: 'Test Transaction',
        date: '2022-01-01',
        type: 'income',
      })
    } catch (e) {
      error = e
    }

    expect(error).to.exist
    expect(error.message).to.include('notNull Violation: Transaction.amount cannot be null')
  })

  it('should not create a transaction without a type', async () => {
    let error = null

    try {
      await Transaction.create({
        name: 'Test Transaction',
        date: '2022-01-01',
        amount: 1000,
      })
    } catch (e) {
      error = e
    }

    expect(error).to.exist
    expect(error.message).to.include('notNull Violation: Transaction.type cannot be null')
  })

  it('should not create a transaction with an invalid type', async () => {
    let error = null

    try {
      await Transaction.create({
        name: 'Test Transaction',
        date: '2022-01-01',
        amount: 1000,
        type: 'invalid',
      })
    } catch (e) {
      error = e
    }

    expect(error).to.exist
    expect(error.message).to.include('Validation error: Validation isIn on type failed')
  })
})
