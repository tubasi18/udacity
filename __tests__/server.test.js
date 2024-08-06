const request = require('supertest');
const app = require('../src/server/server');

describe('Test path "/"', () => {
  test('It should response 200 status code on GET request', async () => {
      const response = await request(app).get('/');
      expect(response.statusCode).toBe(200);
  });
});