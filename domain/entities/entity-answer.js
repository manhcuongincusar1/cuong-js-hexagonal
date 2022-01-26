const enum_ = require('../../util/log');
const { db } = require('../repositories/repository_postgres');
// id
// userId
// formId
// answer: json
// createdAt
// updatedAt
// isDeleted

class Answer {
    constructor(db) {
        this.db = db
    }
    newAnswer(userId, formId, answer) {
        return {
            userId,
            formId,
            answer
        }
    }
    tableName = "form_answers"
    async createOrAlterTable() {
        try {
            const exist = await this.db.connPg.conn.schema.hasTable(this.tableName);
            let res
            if (exist) {
                res = await this.db.connPg.conn.schema.alterTable(this.tableName, table => {
                    table.increments("id").primary();
                    table.integer("userId");
                    table.integer("formId");
                    table.json("answer");
                    table.boolean("isDeleted").defaultTo(false);
                    table.timestamp('createdAt').defaultTo(this.db.connPg.conn.fn.now())
                    table.timestamp("updatedAt");
                });
            } else {
                res = await this.db.connPg.conn.schema.createTable(this.tableName, table => {
                    table.increments("id").primary();
                    table.integer("userId");
                    table.integer("formId");
                    table.json("answer");
                    table.boolean("isDeleted").defaultTo(false);
                    table.timestamp('createdAt').defaultTo(this.db.connPg.conn.fn.now())
                    table.timestamp("updatedAt");
                });
            }
        } catch (err) {
            return await { err: { code: 123, messsage: err } }
        }
    }
    async store(answer) {
        try {
            const res = await this.db.connPg.conn.table(this.tableName)
                .insert(answer)
                .returning("*");
            if (res.length() > 0) {
                console.log("Insert form Success: ", res[0])
            } else {
                console.log("Insert form Fail: ", res)
            }
        } catch (err) {
            console.log(" err entity-form.store = ", err);
            return await { err: { code: 123, messsage: err } }
        }
    }
    async find(option) {
        // build option
        try {
            return await this.db.connPg.conn.table(this.tableName)
                .select("*")
                .where(option ? option : {});
        } catch (err) {
            console.log(" err entity-form.findAll = ", err);
            return await { err: { code: 123, messsage: err } }
        }
    }

    // TODO
    async findById() {}
    async deleteById() {}
    async findOneAndUpdate() {}
}


module.exports = (db) => {
    try {
        schema = new Answer(db);
        // migration
        !async function() {
            console.log("Start to run createTable")
            await schema.createOrAlterTable()
            console.log("Runned createTable")
        }();

    } catch (err) {
        console.log(" err when create users table entity-user.createTable = ", err);
    }
    return schema
}