//MODELOS PARA LOS CONTROLADORES
const {Schema, model} = require('mongoose');
const BCRYPT = require('bcryptjs');

const USER_SCHEMA = new Schema(
    {
        username: {
            type: String,
            unique: true
        },
        email: {
            type: String,
            unique: true
        },
        password: {
            type: String,
            required: true
        },
        roles: [{
            ref: "roles",
            type: Schema.Types.ObjectId
        }]
    },
    {
        timestamps: true,
        versionKey: false
    }
) 


USER_SCHEMA.statics.encryptPass = async (password) => {
    const SALT = await BCRYPT.genSalt(10);
    return await BCRYPT.hash(password, SALT);
}

USER_SCHEMA.statics.comparePass = async (password, receivedPassword) => {
    return await BCRYPT.compare(password, receivedPassword);

}

const AUTH_MODEL = model('users', USER_SCHEMA);


module.exports = {AUTH_MODEL};