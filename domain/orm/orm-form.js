const conn = require('../repositories/repository_postgres')

// id
// title
// description
// language
// questions: json
// authorizedMode: anonymos, auth
// creatorId
// createdAt
// updatedAt

exports.GetAll = async() => {
    try {
        return await conn.db.connPg.Form.find({ isDeleted: false });
    } catch (err) {
        console.log(" err orm-form.GetAll = ", err);
        return await { err: { code: 123, messsage: err } }
    }
}

exports.Store = async(title, description, language, questions, authorizedMode, creatorId) => {
    inserted = conn.db.connPg.Form.newForm(title, description, language, questions, authorizedMode, creatorId)
    try {
        await conn.db.connPg.Form.store(inserted);
        return true
    } catch (err) {
        console.log(" err orm-form.Store = ", err);
        return await { err: { code: 123, messsage: err } }
    }
}

exports.GetById = async(id) => {
    try {
        return await conn.db.connPg.Form.find({ isDeleted: false, id: id });
    } catch (err) {
        console.log(" err orm-form.GetById = ", err);
        return await { err: { code: 123, messsage: err } }
    }
}


//TODO
exports.DeleteById = async(id) => {}
exports.UpdateById = async() => {}