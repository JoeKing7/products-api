// CREAMOS LAS RUTAS PARA LAS VISTAS.
const {Router} = require('express');
const PRODUCT_ROUTER = Router();
const PRODUCTS_CONTROLLER = require('../controllers/products.controller'); //O: const { SAVE_PRODUCT, GET_PRODUCTS, GET_PRODUCT_BY_ID, UPDATE_PRODUCT_BY_ID, DELETE_PRODUCT_BY_ID } = require('../controllers/products.controller');
const {VERIFY_TOKEN, IS_ADMIN, IS_MOD_OR_ADM} = require('../middlewares');

PRODUCT_ROUTER.get('/', PRODUCTS_CONTROLLER.GET_PRODUCTS);
PRODUCT_ROUTER.get('/:productId', PRODUCTS_CONTROLLER.GET_PRODUCT_BY_ID);
PRODUCT_ROUTER.post('/', [VERIFY_TOKEN, IS_ADMIN], PRODUCTS_CONTROLLER.SAVE_PRODUCT);
PRODUCT_ROUTER.put('/:productId', [VERIFY_TOKEN, IS_MOD_OR_ADM], PRODUCTS_CONTROLLER.UPDATE_PRODUCT_BY_ID);
PRODUCT_ROUTER.delete('/:productId', [VERIFY_TOKEN, IS_MOD_OR_ADM], PRODUCTS_CONTROLLER.DELETE_PRODUCT_BY_ID);


module.exports = {PRODUCT_ROUTER};