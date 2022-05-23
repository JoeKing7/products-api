const {AUTH_MODEL} = require('../models/auth.model');

const GET_ALL_USER = async (req, res)=> {
    const GET_USERS = await AUTH_MODEL.find({});
    res.json(GET_USERS);
}


module.exports = {
    GET_ALL_USER
}
