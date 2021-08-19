const Hobbit = require('./hobbits-model')

test('it is the correct environment for the tests', () => {
  expect(process.env.DB_ENV).toBe('testing')
})

describe('Hobbit db access functions', () => {

  describe('Hobbit.getAll', () => {
    it('resolves to all hobbits in the hobbits table', async () => {
      const hobbits = await Hobbit.getAll()
      expect(hobbits).
    })
    it('resolves the the correct hobbit shapes', async () => {

    })
  })

  describe('Hobbit.insert', () => {

  })
})
