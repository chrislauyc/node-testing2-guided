const dbConfig = require('../../data/dbConfig')
const Hobbit = require('./hobbits-model')

test('it is the correct environment for the tests', () => {
  expect(process.env.DB_ENV).toBe('testing')
})

beforeAll(async () => {
  await dbConfig.migrate.rollback()
  await dbConfig.migrate.migrate()
})

describe('Hobbit db access functions', () => {

  describe('Hobbit.getAll', () => {
    it('resolves to all hobbits in the hobbits table', async () => {
      const hobbits = await Hobbit.getAll()
      expect(hobbits.length).toBe(4)
    })
    it('resolves the the correct hobbit shapes', async () => {

    })
  })

  describe('Hobbit.insert', () => {

  })
})
