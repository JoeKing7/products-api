//1. CREAMOS EL SERVER Y PASAMOS A -> INDEX.JS EXPORTANDO APP
const EXPRESS = require('express');
const MORGAN = require('morgan');
const PKG = require('../package.json');
const {CREATE_ROLES} = require('./libs/initialSetup');
const {PRODUCT_ROUTER} = require('./routes/products.routes');
const {AUTH_ROUTER} = require('./routes/auth.routes');
const {USER_ROUTER} = require('./routes/users.routes');

const APP = EXPRESS();
CREATE_ROLES();

APP.set('pkg', PKG);

APP.use(MORGAN('dev'));
APP.use(EXPRESS.json());

APP.get('/', (req, res) => {
    res.json({
        name: APP.get('pkg').name,
        author: APP.get('pkg').author,
        description: APP.get('pkg').description,
        version: APP.get('pkg').version
    });
})

APP.use('/api/products', PRODUCT_ROUTER);
APP.use('/api/auth', AUTH_ROUTER);
APP.use('/api/users', USER_ROUTER);

module.exports = {APP};
