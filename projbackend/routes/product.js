const express = require('express');
const router = express.Router();

const {getUserById} = require('../controllers/user');
const { isSignedIn,isAuthenticated,isAdmin} = require('../controllers/auth');
const { getProductById,createProduct,getProduct,photo,deleteProduct,updateProduct,getAllProducts,getAllUniqueCatogary} = require('../controllers/product');

//ALL PAERAM
router.param("userId",getUserById);
router.param("productId",getProductById);

//ACTUAL ROUTE
router.post('/product/create/:userId',isSignedIn,isAuthenticated,isAdmin,createProduct);

//READ ROUTE
router.get('/product/:productId',getProduct);
router.get('/product/photo/:productId',photo);
//router.get('products',getAllProducts);

//DELETE ROUTE
router.delete('/product/:productId/:userId',isSignedIn,isAuthenticated,isAdmin,deleteProduct);

//UPDATE ROUTE
router.put('/product/:productId/:userId',isSignedIn,isAuthenticated,isAdmin,updateProduct);

//LISTING ROUTE
router.get('/products',getAllProducts);
router.get('/products/catogries',getAllUniqueCatogary);

module.exports = router;