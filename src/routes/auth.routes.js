const {Router} = require('express');
const AUTH_ROUTER = Router();
const AUTH_CONTROLLER = require('../controllers/auth.controller');
const {VERIFY_SIGNUP} = require('../middlewares');

AUTH_ROUTER.post('/signup', [VERIFY_SIGNUP.CHECK_ROLES_EXISTS, VERIFY_SIGNUP.CHECK_DUPLICATE_USER], AUTH_CONTROLLER.SIGN_UP);
AUTH_ROUTER.post('/signin', AUTH_CONTROLLER.SIGN_IN);


module.exports = {AUTH_ROUTER};