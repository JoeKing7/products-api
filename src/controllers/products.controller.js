//CREAMOS LOS CONTROLADORES PARA LAS RUTAS
const {PRODUCT_MODEL} = require('../models/product.model');

const SAVE_PRODUCT = async (req, res) => {
    
    let {name, category, price, imgUrl} = req.body;
    const NEW_PRODUCT = new PRODUCT_MODEL({name, category, price, imgUrl});
    let data = await NEW_PRODUCT.save();
    res.status(201).json(data);
}

const GET_PRODUCTS = async (req, res) => {

    const GET_ALL_PRODUCTS = await PRODUCT_MODEL.find({});
    res.json(GET_ALL_PRODUCTS);
}

const GET_PRODUCT_BY_ID = async (req, res) => {
    
    const GET_PRODUCT = await PRODUCT_MODEL.findById(req.params.productId);
    res.status(200).json(GET_PRODUCT);
}

const UPDATE_PRODUCT_BY_ID = async (req, res) => {
    const UPDATE_PRODUCT = await PRODUCT_MODEL.findByIdAndUpdate(req.params.productId, req.body, {
        new: true
    });
    res.status(200).json(UPDATE_PRODUCT);

}

const DELETE_PRODUCT_BY_ID = async (req, res) => {
    await PRODUCT_MODEL.findByIdAndDelete(req.params.productId);
    res.status(200).json("Deleted.");
}

module.exports = {
    SAVE_PRODUCT,
    GET_PRODUCTS,
    GET_PRODUCT_BY_ID,
    UPDATE_PRODUCT_BY_ID,
    DELETE_PRODUCT_BY_ID
}