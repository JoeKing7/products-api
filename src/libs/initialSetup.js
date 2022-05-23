const {ROLE_MODEL} = require('../models/role.model');


const CREATE_ROLES = async ()=> {
    try {
        const COUNT = await ROLE_MODEL.estimatedDocumentCount();

        if (COUNT > 0) {
            return;
        }

        const ROLES = await Promise.all([
            new ROLE_MODEL({name: 'user'}).save(),
            new ROLE_MODEL({name: 'moderator'}).save(),
            new ROLE_MODEL({name: 'admin'}).save(),
        ])

        console.log(ROLES);
    } catch (error) {
        console.error(error);
    }
    
}


module.exports = {CREATE_ROLES}