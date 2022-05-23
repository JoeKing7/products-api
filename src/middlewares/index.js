// PARA LLAMAR A LOS DOS auth y verify
const {VERIFY_TOKEN, IS_MODERATOR, IS_ADMIN, IS_MOD_OR_ADM} = require('./authJwt');
const VERIFY_SIGNUP = require('./verifySignup');


module.exports = {
    VERIFY_TOKEN,
    IS_MODERATOR,
    IS_ADMIN,
    IS_MOD_OR_ADM,
    VERIFY_SIGNUP
}