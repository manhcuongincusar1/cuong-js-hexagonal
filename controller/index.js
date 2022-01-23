'use strict';

const express = require('express'),
    router = express.Router(),
    log = require('../util/log'),
    users = require('../domain/services/service-user');

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

module.exports = router;