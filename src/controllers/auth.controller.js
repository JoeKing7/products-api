//CREAMOS LOS CONTROLADORES PARA LAS RUTAS
const {AUTH_MODEL} = require('../models/auth.model');
const JWT = require('jsonwebtoken');
const CONFIG = require('../config');
const {ROLE_MODEL} = require('../models/role.model');

const SIGN_UP = async (req, res) => {
    let {username, email, password, roles} = req.body;

    const SIGNUP = new AUTH_MODEL(
        {
            username,
            email,
            password: await AUTH_MODEL.encryptPass(password),
        }
    ) 

    if (roles) {
        const ROLE_FOUND = await ROLE_MODEL.find({name: {$in: roles}});
        SIGNUP.roles = ROLE_FOUND.map(role => role._id);
        
    } else {
        const ROLE = await ROLE_MODEL.findOne({name: "user"});
        SIGNUP.roles = [ROLE._id];
        
    }
    const USER_SAVED = await SIGNUP.save();
    const TOKEN = JWT.sign({id: USER_SAVED._id}, CONFIG.SECRET_KEY, {
        expiresIn: 86400 //24 horas
    })
    res.json({TOKEN});
}

const SIGN_IN = async (req, res) => {
    let {email, password} = req.body;
    const USER_FOUND = await AUTH_MODEL.findOne({email}).populate("roles");
    
    if (!USER_FOUND) {
        return res.status(400).json({msg: "User not found"});
    }
    
    const PASS_MATCH = await AUTH_MODEL.comparePass(password, USER_FOUND.password);

    if (!PASS_MATCH) {
        return res.status(401).json({msg: "credentials are incorrect!"})
    }

    const TOKEN = JWT.sign({id: USER_FOUND._id}, CONFIG.SECRET_KEY, {
        expiresIn: 86400 //24 horas
    })
    res.json({TOKEN});

}

module.exports = {
    SIGN_IN,
    SIGN_UP
}