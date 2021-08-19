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
      expect(hobbits).toHaveLength(4)
    })
    it('resolves the the correct hobbit shapes', async () => {
      const hobbits = await Hobbit.getAll()
      expect(hobbits[0]).toHaveProperty('id', 1)
      expect(hobbits[0]).toHaveProperty('name', 'sam')

      expect(hobbits[1]).toMatchObject({ id: 2, name: 'frodo' })
      expect(hobbits[2]).toMatchObject({ id: 3, name: 'merry' })
    })
  })

  describe('Hobbit.insert', () => {
    it('adds a new hobbit to the table', async () => {
      // get a hobbit in there using insert
      // assert that the db holds 5 hobbits
      await Hobbit.insert({ name: 'bilbo' })
    })
  })
})
