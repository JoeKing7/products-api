//MODELOS PARA LOS CONTROLADORES
const {Schema, model} = require('mongoose');
const API_ROLES = ["user", "moderator", "admin"];

const ROLE_SCHEMA = new Schema(
    {
        name: String
    },
    {
        versionKey: false
    }
)

const ROLE_MODEL = model('roles', ROLE_SCHEMA);

module.exports = {
    ROLE_MODEL, 
    API_ROLES
};