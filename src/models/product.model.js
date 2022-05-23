//MODELOS PARA LOS CONTROLADORES
const {Schema, model} = require('mongoose');

const PRODUCT_SCHEMA = new Schema(
    {
        name: String,
        category: String,
        price: Number,
        imgUrl: String
    },
    {
        timestamps: true,
        versionKey: false
    }
)

const PRODUCT_MODEL = model('product', PRODUCT_SCHEMA);

module.exports = {PRODUCT_MODEL}