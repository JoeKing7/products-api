//USUARIOS CREADOS POR ADMINISTRADOR
const {Router} = require('express');
const USER_ROUTER = Router();
const USER_CONTROLLER = require('../controllers/user.controller');
const AUTH_CONTROLLER = require('../controllers/auth.controller');

const {VERIFY_TOKEN, IS_ADMIN, VERIFY_SIGNUP} = require('../middlewares');

USER_ROUTER.post('/', [VERIFY_TOKEN, VERIFY_SIGNUP.CHECK_ROLES_EXISTS, VERIFY_SIGNUP.CHECK_DUPLICATE_USER, IS_ADMIN], AUTH_CONTROLLER.SIGN_UP);
USER_ROUTER.get('/', USER_CONTROLLER.GET_ALL_USER);


module.exports = {USER_ROUTER};