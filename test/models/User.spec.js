const { expect } = require('chai')
const { User } = require('../../models')

describe('User Model', () => {
  it('should create a new user with valid attributes', async () => {
    const user = await User.create({
      username: 'testuser',
      password: 'testpassword',
      email: 'testuser@example.com',
    })

    expect(user).to.be.an('object')
    expect(user.username).to.equal('testuser')
    expect(user.email).to.equal('testuser@example.com')
  })
})
