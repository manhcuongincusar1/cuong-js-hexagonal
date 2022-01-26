# cuong-js-hexagonal
cuong minimum starter http server with js - event driven architecture

## Config
- config your postgres server like: ./config.yml
## Test
- npm run test
    + test post request
    + test Get All

## Start
- npm start

## Deployment: deployment.md

## Security: security.md
## Endpoint

- http://localhost:8080/api/v1/users POST (create user comment)
body(json):{
    firstName: "cuong",
    lastName: "nguyen",
    age: 28,
    email: "cuong@vn.com",
    comment: "production made me sad",
    phoneNumber: "0934177324"
}

- http://localhost:8080/api/v1/users GET (Get all user comments)

- /api/v1/forms POST
  body(json):  {
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
            }
- /api/v1/forms GET

- /api/v1/answers POST
   body(json): {
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
            }

- /api/v1/answers GET

## Deployment:

- Step 1 containerize package
- Step 2 compose image with: this package and postgres
