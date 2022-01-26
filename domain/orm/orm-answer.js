const conn = require('../repositories/repository_postgres')

// id
// userId
// formId
// answer: json
// createdAt
// updatedAt
// isDeleted

exports.GetAll = async(option) => {
    try {
        return await conn.db.connPg.Answer.find(option);
    } catch (err) {
        console.log(" err orm-answer.GetAll = ", err);
        return await { err: { code: 123, messsage: err } }
    }
}


exports.Store = async(userId, formId, answer) => {
    inserted = conn.db.connPg.Answer.newAnswer(userId, formId, answer)
    try {
        await conn.db.connPg.Answer.store(inserted);
        return true
    } catch (err) {
        console.log(" err orm-answer.store = ", err);
        return await { err: { code: 123, messsage: err } }
    }
}


//TODO
exports.DeleteById = async(id) => {}
exports.GetById = async(id) => {}
exports.UpdateById = async() => {}