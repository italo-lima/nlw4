import request from "supertest"

import { app } from "../app"
import createConnection from "../database"

describe('Surveys', () => {

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

    const response = await request(app)
      .post('/surveys')
      .send({
        title: 'example',
        description: 'example'
      })
    
    expect(response.status).toBe(201)
    expect(response.body).toHaveProperty('id')
  })

  it('should be able to get all surveys', async () => {
    await request(app)
      .post('/surveys')
      .send({
        title: 'example2',
        description: 'example2'
      })
    
    const response = await request(app).get('/surveys')
    expect(response.body.length).toBe(2)
  })
})