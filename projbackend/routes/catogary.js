const express = require('express');
const router = express.Router();

const { getCatogaryById, createCatogary, getCatogary, getAllCatogary, updateCatogary, removeCatogary } = require('../controllers/catogary');
const { getUserById } = require('../controllers/user');
const { isSignedIn, isAuthenticated, isAdmin } = require('../controllers/auth');

//PARAMETER ROUTE
router.param('userId', getUserById);
router.param('catogaryId', getCatogaryById);

//CREATE ROUTE
router.post('/catogary/create/:userId', isSignedIn, isAuthenticated, isAdmin, createCatogary);

//READ ROUTE
router.get('/catogary/:catogaryId', getCatogary);
router.get('/catogeries', getAllCatogary);

//UPDATE ROUTE
router.put('/catogary/:catogaryId/:userId', isSignedIn, isAuthenticated, isAdmin, updateCatogary);


//DELETE ROUTE
router.delete('/catogary/:catogaryId/:userId', isSignedIn, isAuthenticated, isAdmin, removeCatogary);


module.exports = router;