const express = require('express');
const router = express.Router();

const {getUserById,pushOrderInPurchaseList} = require('../controllers/user');
const { isSignedIn,isAuthenticated,isAdmin} = require('../controllers/auth');
const {updateStock} = require('../controllers/product');
const {getOrderById,createOrder,getAllOrders,getOrderStatus,updateStatus} = require('../controllers/order');


//PARAM
router.param('userId',getUserById);
router.param('orderId',getOrderById);

//ACTUAL ROUTE
router.post('/order/create/:userId',isSignedIn,isAuthenticated,pushOrderInPurchaseList,updateStock,createOrder);

//READ ROUTE
router.get('/order/all/:userId',isSignedIn,isAuthenticated,isAdmin,getAllOrders)

//STATUS OF ORDER
router.get('/order/status/:userId',isSignedIn,isAuthenticated,isAdmin,getOrderStatus);
router.put('/order/:orderId/status/:userId',isSignedIn,isAuthenticated,isAdmin,updateStatus)

module.exports = router;