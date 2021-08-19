const db = require('../../data/dbConfig')
const Hobbit = require('./hobbits-model')

test('it is the correct environment for the tests', () => {
  expect(process.env.DB_ENV).toBe('testing')
})

beforeAll(async () => {
  await db.migrate.rollback()
  await db.migrate.latest()
})
beforeEach(async () => {
  await db.seed.run()
})

describe('Hobbit db access functions', () => {

  describe('Hobbit.getAll', () => {
    it('resolves to all hobbits in the hobbits table', async () => {
      const hobbits = await Hobbit.getAll()
      expect(hobbits.length).toBe(4)
    })
    it('resolves the the correct hobbit shapes', async () => {
      const hobbits = await Hobbit.getAll()
      expect(hobbits[0]).toHaveProperty('id', 1)
      expect(hobbits[0]).toHaveProperty('name', 'sam')

      expect(hobbits[1]).toMatchObject({ id: 2, name: 'frodo' })
    })
  })

  describe('Hobbit.insert', () => {

  })
})
