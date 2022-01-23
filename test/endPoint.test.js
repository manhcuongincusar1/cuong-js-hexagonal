const request = require('supertest');
const app = require('../server');

describe('Post Endpoints', () => {
    it('should create a new user', async() => {
        const res = await request(app)
            .post('/api/v1/users/')
            .send({
                firstName: "cuong",
                lastName: "nguyen",
                age: 28,
                email: "cuong@vn.com",
                comment: "production made me sad",
                phoneNumber: "0934177324"
            });
        expect(res.statusCode).toEqual(201);
        expect(res.body.status).toEqual('Success');
    });
});