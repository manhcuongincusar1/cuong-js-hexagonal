const enum_ = require('../../util/log');
const { db } = require('../repositories/repository_postgres');

class User {

    constructor(db) {
        this.db = db
    }

    newUser(firstName, lastName, age, email, phoneNumber, comment) {
        return {
            firstName,
            lastName,
            age,
            email,
            phoneNumber,
            comment
        }
    }
    async createOrAlterTable() {
        console.log("this.db.connPg.conn.schema: ", this.db.connPg.conn.schema)
        try {
            const exist = await this.db.connPg.conn.schema.hasTable("users");
            let res
            if (exist) {
                res = await this.db.connPg.conn.schema.alterTable("users", table => {
                    table.increments("id").primary();
                    table.text("firstName", 100);
                    table.text("lastName", 100);
                    table.integer("age");
                    table.text("email");
                    table.text("comment");
                    table.text("phoneNumber");
                    table.boolean("isDeleted");
                    table.timestamp('createdAt').defaultTo(this.db.connPg.conn.fn.now())
                    table.timestamp("updatedAt");
                });
            } else {
                res = await this.db.connPg.conn.schema.createTable("users", table => {
                    table.increments("id").primary();
                    table.text("firstName", 100);
                    table.text("lastName", 100);
                    table.integer("age");
                    table.text("email");
                    table.text("comment");
                    table.text("phoneNumber");
                    table.boolean("isDeleted");
                    table.timestamp('createdAt').defaultTo(this.db.connPg.conn.fn.now())
                    table.timestamp("updatedAt");
                });
            }
            console.log("res from create database: ", res)
        } catch (err) {
            console.log(" err entity-user.createTable = ", err);
            return await { err: { code: 123, messsage: err } }
        }
    }
    async store(user) {
        try {
            const userRes = await this.db.connPg.conn.table("users")
                .insert({
                    firstName: user.firstName,
                    lastName: user.lastName,
                    age: user.age,
                    email: user.email,
                    phoneNumber: user.phoneNumber,
                    comment: user.comment,
                })
                .returning("*");
            if (userRes.length() > 0) {
                console.log("Insert User Success: ", userRes[0])
            } else {
                console.log("Insert User Fail: ", userRes)
            }
        } catch (err) {
            console.log(" err entity-user.store = ", err);
            return await { err: { code: 123, messsage: err } }
        }
    }
    async find(option) {
        try {
            return await this.db.connPg.conn.table("users")
                .select("*");
        } catch (err) {
            console.log(" err entity-user.findAll = ", err);
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
        userSchema = new User(db);
        !async function() {
            console.log("Start to run createTable")
            await userSchema.createOrAlterTable()
            console.log("Runned createTable")
        }();

    } catch (err) {
        console.log(" err when create users table entity-user.createTable = ", err);
    }
    return userSchema
}