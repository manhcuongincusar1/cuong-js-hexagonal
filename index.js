'use strict';
const config = require('config-yml'),
    server = require('./server');

server.listen(config.port);
console.log('Server is listening on port: ' + config.port);

server.on('error', err => {
    console.error(err);
});