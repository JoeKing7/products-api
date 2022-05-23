const JWT = require('jsonwebtoken');
const CONFIG = require('../config');
const { AUTH_MODEL } = require('../models/auth.model');
const { ROLE_MODEL } = require('../models/role.model');

const VERIFY_TOKEN = async (req, res, next) => {

    try {
        const TOKEN = req.headers["x-access-token"];

        if (!TOKEN) {
            return res.status(403).json({ msg: "No token sent" });
        }

        const TOKEN_MATCH = JWT.verify(TOKEN, CONFIG.SECRET_KEY);

        req.userId = TOKEN_MATCH.id;
        const USER_FOUND = await AUTH_MODEL.findById(req.userId, { password: 0 });
        if (!USER_FOUND) {
            return res.status(404).json({ msg: "No user found with that token" });
        }
        next();
    } catch (error) {
        return res.status(401).json({ msg: "Unauthorized", err: error });
    }

}

const IS_MODERATOR = async (req, res, next) => {
   const USER_EXISTS = await AUTH_MODEL.findById(req.userId);
   const GET_ROL = await ROLE_MODEL.find({_id:  {$in: USER_EXISTS.roles}});
  
   for (let index = 0; index < GET_ROL.length; index++) {
        if (GET_ROL[index].name === "moderator") {
            next();
            return;
       } 
   }

   return res.status(403).json({msg: "Unauthorized. Require moderator provilage."});
}

const IS_ADMIN = async (req, res, next) => {
    const USER_EXISTS = await AUTH_MODEL.findById(req.userId);
    const GET_ROL = await ROLE_MODEL.find({_id:  {$in: USER_EXISTS.roles}});
    
    for (let index = 0; index < GET_ROL.length; index++) {
        if (GET_ROL[index].name === "admin") {
            next();
            return;
       } 
   }
    return res.status(403).json({msg: "Unauthorized. Require admin privilage."});
}

const IS_MOD_OR_ADM = async (req, res, next) => {
    const USER_EXISTS = await AUTH_MODEL.findById(req.userId);
    const GET_ROL = await ROLE_MODEL.find({_id:  {$in: USER_EXISTS.roles}});
    
    for (let index = 0; index < GET_ROL.length; index++) {
        if (GET_ROL[index].name === "moderator" || GET_ROL[index].name === "admin") {
            next();
            return;
       } 
   }
    return res.status(403).json({msg: "Unauthorized. Require admin or moderator privilage."});
}

module.exports = { 
    VERIFY_TOKEN,
    IS_MODERATOR,
    IS_ADMIN,
    IS_MOD_OR_ADM
};