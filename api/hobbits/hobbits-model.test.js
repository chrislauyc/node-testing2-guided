const Hobbit = require('./hobbits-model')

test('it is the correct environment for the tests', () => {
  expect(process.env.DB_ENV).toBe('testing')
})

describe('Hobbit db access functions', () => {

  describe('Hobbit.getAll', () => {

  })

  describe('Hobbit.insert', () => {

  })
})
