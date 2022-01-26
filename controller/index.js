'use strict';

const express = require('express'),
    router = express.Router(),
    log = require('../util/log'),
    users = require('../domain/services/service-user'),
    forms = require('../domain/services/service-form'),
    answers = require('../domain/services/service-answer');

console.log('[[ USERS ROUTES ]]');
log.LogSuccess('[POST] = /users/');
log.LogInfo('[GET] = /users/');

// TODO
// log.LogInfo('[GET] = /users/:id')
// log.LogWarning('[PATCH] = /users/:id')
// log.LogDanger('[DELETE] = /users/:id')

router.get('/users/', users.GetAll);
router.post('/users/', users.Store);

// TODO
// router.get('/users/:id', users.GetById);
// router.delete('/users/:id', users.DeleteById);
// router.patch('/users/:id', users.UpdateById);

console.log('[[ FORM ROUTES ]]');
log.LogSuccess('[POST] = /forms/');
log.LogInfo('[GET] = /forms/');

router.get('/forms/', forms.GetAll);
router.post('/forms/', forms.Store);

console.log('[[ ANSWER ROUTES ]]');
log.LogSuccess('[POST] = /answers/');
log.LogInfo('[GET] = /answers/');

router.get('/answers/', answers.GetAll);
router.post('/answers/', answers.Store);


module.exports = router;