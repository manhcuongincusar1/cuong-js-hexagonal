// FORM
// id
// title
// description
// language
// questions: json
// authorizedMode: anonymos, auth
// creatorId
// createdAt
// updatedAt

//JSON questions
const enum_ = require('../../util/log');

class Form {
    constructor(db) {
        this.db = db
    }
    newForm(title, description, language, questions, authorizedMode, creatorId) {
        return {
            title,
            description,
            language,
            questions,
            authorizedMode,
            creatorId
        }
    }
    tableName = "forms"
    async createOrAlterTable() {
        try {
            const exist = await this.db.connPg.conn.schema.hasTable(this.tableName);
            let res
            if (exist) {
                res = await this.db.connPg.conn.schema.alterTable(this.tableName, table => {
                    table.increments("id").primary();
                    table.text("title");
                    table.text("description");
                    table.text("language");
                    table.json("questions");
                    table.text("authorizedMode"); // not null
                    table.boolean("isDeleted").defaultTo(false);
                    table.timestamp('createdAt').defaultTo(this.db.connPg.conn.fn.now())
                    table.timestamp("updatedAt");
                });
            } else {
                res = await this.db.connPg.conn.schema.createTable(this.tableName, table => {
                    table.increments("id").primary();
                    table.integer("creatorId");
                    table.text("title");
                    table.text("description");
                    table.text("language");
                    table.json("questions");
                    table.text("authorizedMode"); // not null
                    table.boolean("isDeleted").defaultTo(false);
                    table.timestamp('createdAt').defaultTo(this.db.connPg.conn.fn.now())
                    table.timestamp("updatedAt");
                });
            }
        } catch (err) {
            return await { err: { code: 123, messsage: err } }
        }
    }
    async store(form) {
        // insert
        try {
            const res = await this.db.connPg.conn.table(this.tableName)
                .insert(form)
                .returning("*");
            // log
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
        schema = new Form(db);
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