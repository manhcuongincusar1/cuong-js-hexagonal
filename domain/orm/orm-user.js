const conn = require('../repositories/repository_postgres')



exports.GetAll = async() => {
    try {
        return await conn.db.connPg.User.find();
    } catch (err) {
        console.log(" err orm-user.GetAll = ", err);
        return await { err: { code: 123, messsage: err } }
    }
}

exports.Store = async(firstName, lastName, age, email, phoneNumber, comment) => {
    console.log("conn.db.connPg.User: ",
        conn.db.connPg.User.newUser)
    insertedUser = conn.db.connPg.User.newUser(firstName,
        lastName,
        age,
        email,
        phoneNumber,
        comment)
    try {
        console.log("conn.db.connPg.User.store: ",
            conn.db.connPg.User.store)
        await conn.db.connPg.User.store(insertedUser);
        return true
    } catch (err) {
        console.log(" err orm-user.Store = ", err);
        return await { err: { code: 123, messsage: err } }
    }
}

//TODO
exports.DeleteById = async(id) => {}
exports.GetById = async(id) => {}
exports.UpdateById = async(firstName, lastName, age, email, phoneNumber, comment) => {}