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


## Endpoint

- https://localhost:8080/api/v1/users POST (create user comment)
{
    firstName: "cuong",
    lastName: "nguyen",
    age: 28,
    email: "cuong@vn.com",
    comment: "production made me sad",
    phoneNumber: "0934177324"
}

- https://localhost:8080/api/v1/users GET (Get all user comments)


## Deployment:

- Step 1 containerize package
- Step 2 compose image with: this package and postgres
