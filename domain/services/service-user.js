const log = require('../../util/log');
const enum_ = require('../../util/enum');
const ormUser = require('../orm/orm-user');
const { isUuid } = require('uuidv4');


exports.GetAll = async(req, res) => {
    let status = 'Success',
        errorCode = '',
        message = '',
        data = '',
        statusCode = 0,
        resp = {};
    try {
        respOrm = await ormUser.GetAll();
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
        const {
            firstName,
            lastName,
            age,
            email,
            phoneNumber,
            comment
        } = req.body
        if (firstName && lastName && age && email) {
            respOrm = await ormUser.Store(firstName,
                lastName,
                age,
                email,
                phoneNumber,
                comment);
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