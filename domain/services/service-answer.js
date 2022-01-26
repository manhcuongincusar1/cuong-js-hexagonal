const log = require('../../util/log');
const enum_ = require('../../util/enum');
const ormAnswer = require('../orm/orm-answer');
const ormForm = require('../orm/orm-form');
const { validateConstraint } = require('../../util/formConstraintValidate');



exports.GetAll = async(req, res) => {
    let status = 'Success',
        errorCode = '',
        message = '',
        data = '',
        statusCode = 0,
        resp = {};
    try {
        respOrm = await ormAnswer.GetAll();
        if (respOrm.err) {
            status = 'Failure', errorCode = respOrm.err.code, message = respOrm.err.messsage, statusCode = enum_.CODE_BAD_REQUEST;
        } else {
            message = 'Success Response', data = respOrm, statusCode = data.length > 0 ? enum_.CODE_OK : enum_.CODE_NO_CONTENT;
        }
        resp = await log.ResponseService(status, errorCode, message, data);
        return res.status(statusCode).send(resp);
    } catch (err) {
        console.log("err = ", err);
        resp = await log.ResponseService('Failure', enum_.CRASH_LOGIC, err, '');
        return res.status(enum_.CODE_INTERNAL_SERVER_ERROR).send(resp);
    }
}
exports.Store = async(req, res) => {
    let status = 'Success',
        errorCode = '',
        message = '',
        data = '',
        statusCode = 0,
        resp = {};
    try {
        const { userId, formId, answers } = req.body

        // // Validation
        // // Get form 
        // if (!formId) {
        //     return res.status(enum_.CODE_BAD_REQUEST).send(await log.ResponseService('Failure', enum_.ID_NOT_FOUND, 'err', ''));
        // }
        // const form = await ormForm.GetById(formId)

        // // If form authorizedMode != anonymous --> check userId
        // if (form.authorizedMode != "anonymous" && !userId) {
        //     return res.status(enum_.CODE_BAD_REQUEST).send(await log.ResponseService('Failure', enum_.ERROR_REQUIRED_FIELD, 'err', ''));
        // }

        // // Check if answer valid to form meta data
        // if (answers && Array.isArray(answers) == true) {
        //     answers.forEach(answer => {
        //         question = form.questions[`${answer.questionId}`]
        //         if (!question) {
        //             return res.status(enum_.CODE_BAD_REQUEST).send(await log.ResponseService('Failure', enum_.ERROR_REQUIRED_FIELD, 'err', ''));
        //         }
        //         const error = validateConstraint(question, answer.value)
        //         if (error) {
        //             return res.status(enum_.CODE_BAD_REQUEST).send(await log.ResponseService('Failure', enum_.ERROR_REQUIRED_FIELD, 'err', ''));
        //         }
        //     });
        // }

        if (formId && answers) {
            respOrm = await ormAnswer.Store(userId, formId, answers);
            if (respOrm.err) {
                status = 'Failure', errorCode = respOrm.err.code, message = respOrm.err.messsage, statusCode = enum_.CODE_BAD_REQUEST;
            } else {
                message = 'User created', statusCode = enum_.CODE_CREATED;
            }
        } else {
            status = 'Failure', errorCode = enum_.ERROR_REQUIRED_FIELD, message = 'All fields are required', statusCode = enum_.CODE_BAD_REQUEST;
        }
        resp = await log.ResponseService(status, errorCode, message, data)
        return res.status(statusCode).send(resp);
    } catch (err) {
        console.log("err = ", err);
        return res.status(enum_.CODE_INTERNAL_SERVER_ERROR).send(await log.ResponseService('Failure', enum_.CRASH_LOGIC, 'err', ''));
    }
}

//TODO
exports.UpdateById = async(req, res) => {}
exports.GetById = async(req, res) => {}
exports.DeleteById = async(req, res) => {}