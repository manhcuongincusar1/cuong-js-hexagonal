const config = require('config-yml');
const knex = require('knex')
const enum_ = require('../../util/log');
const user = require('../entities/entity-user');

let arrayConns = [],
    db = {};

if (config.db.pg && config.db.pg.length > 0) {
    config.db.pg.map((c) => {
        const conn = knex({
            client: 'pg',
            version: '7.2',
            connection: {
                host: c.host,
                port: c.port,
                user: c.User,
                password: c.password,
                database: c.database
            }
        });
        db[c.nameconn] = {}
        db[c.nameconn].conn = conn;
        db[c.nameconn].User = user(db);
    });
    exports.db = db;
} else {
    enum_.LogDanger("Not support database")
}