const request = require('supertest')
const db = require('../data/dbConfig')
const server = require('./server')

beforeAll(async () => {
  await db.migrate.rollback()
  await db.migrate.latest()
})
beforeEach(async () => {
  await db.seed.run()
})
afterAll(async () => {
  await db.destroy()
})

describe('[GET] /hobbits', () => {
  it('should return a 200 OK status', async () => {
    const res = await request(server).get('/hobbits')
    expect(res.status).toBe(200)
  })
  it('should return JSON', async () => {
    const res = await request(server).get('/hobbits')
    console.log(res.header)
    expect(res.type).toBe('application/json')
  })
  it('should return a list of hobbits', async () => {
    // you
  })
})
