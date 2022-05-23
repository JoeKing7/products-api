// SI EXISTE EL MAIL, USER  O ROL ESTÁ CREADO. ES UN VALIDADOR
const {API_ROLES} = require('../models/role.model');
const {AUTH_MODEL} = require('../models/auth.model');


const CHECK_ROLES_EXISTS = (req, res, next) => {
    if (req.body.roles) {
        for (let index = 0; index < req.body.roles.length; index++) {
            if (!API_ROLES.includes(req.body.roles[index])) {
                res.status(400).json({msg: `The rol ${req.body.roles[index]} does not exists.`});
                return;
            }
        }
    }
    next();
}

const CHECK_DUPLICATE_USER = async (req, res, next) => {
    
    const USER = await AUTH_MODEL.find({username: req.body.username});
    console.log(USER, {username: req.body.username});
    if (USER.length != 0) {
        return res.status(400).json({msg: "User already exists."});
    }

    const EMAIL = await AUTH_MODEL.find({email: req.body.email});
    console.log(EMAIL, {email: req.body.email});
    if (EMAIL.length != 0) {
        return res.status(400).json({msg: "Email already exists."});
    }
    
    next();
}
module.exports = {
    CHECK_ROLES_EXISTS,
    CHECK_DUPLICATE_USER
}