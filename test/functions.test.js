const expectCt = require('helmet/dist/middlewares/expect-ct');
const ormUser = require('../domain/orm/orm-user');

describe('Post Endpoints', () => {
    it('respone should is an array with length greter than 0', async() => {
        const res = await ormUser.GetAll();
        expect(res.length).toBeGreaterThan(0);
    });
});