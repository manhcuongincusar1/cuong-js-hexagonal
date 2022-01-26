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


describe('Post form', () => {
    it('should create new form', async() => {
        const res = await request(app)
            .post('/api/v1/forms/')
            .send({
                "title": "User Infomation",
                "description": "we just need some basic infomation of you before providing demo product",
                "language": "vi",
                "authorizedMode": "anonymous",
                "creatorId": 1,
                "questions": {
                    "1": {
                        "id": 1,
                        "type": "short-text",
                        "title": "where do you live?",
                        "description": "tell us exactly house number"
                    },
                    "2": {
                        "id": 2,
                        "type": "number",
                        "title": "How old are you?",
                        "description": "must under 150",
                        "constraint": {
                            "range": [0, 150]
                        }
                    },
                    "3": {
                        "id": 3,
                        "type": "option",
                        "title": "Please choose 3 phrase that most matched with you:",
                        "description": "",
                        "constraint": {
                            "in": ["handsome", "rich"],
                            "numberOfAnswers": ["none", 3],
                            "type": "array"
                        }
                    }
                }
            });
        expect(res.statusCode).toEqual(201);
        expect(res.body.status).toEqual('Success');
    });
})


describe('Post answer', () => {
    it('should create new answer', async() => {
        const res = await request(app)
            .post('/api/v1/answers/')
            .send({
                "userid": null,
                "formId": 1,
                "answers": [{
                        "questionId": 1,
                        "value": "hcmc"
                    },
                    {
                        "questionId": 2,
                        "value": 28
                    },
                    {
                        "questionId": 3,
                        "value": ["handsome", "rich", "good health"]
                    }
                ]
            });
        expect(res.statusCode).toEqual(201);
        expect(res.body.status).toEqual('Success');
    })
})