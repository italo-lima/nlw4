import request from "supertest"

import { app } from "../app"
import createConnection from "../database"

describe('Users', () => {

  beforeAll(async () => {
    const connection = await createConnection()
    await connection.runMigrations()
  })

  afterAll(async () => {
    const connection = await createConnection()
    await connection.dropDatabase()
    await connection.close()
  })

  it('should be able return status 201 case as correct isolated information', async () => {

    await request(app)
      .post('/users')
      .send({
        email: 'user@example.com',
        name: 'user'
      })
    .expect(201)
  })

  it('should not be able to create a user with exists email', async () => {

    await request(app)
      .post('/users')
      .send({
        email: 'user@example.com',
        name: 'user'
      })
    .expect(400)
  })
})