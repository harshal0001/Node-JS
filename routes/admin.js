const path = require('path');

const express =  require('express');

const rootDir = require('../utils/path.js');

const router = express.Router();

const products = [];

// /admin/add-product =>GET
router.get('/add-products', (req,res,next)=>{
    res.render('add-product', { pageTitle: 'Add Products', path: '/admin/add-product' });
});

// /admin/add-product =>POST
router.post('/add-products', (req,res,next)=>{
    products.push({title:req.body.title});
    res.redirect('/');
});

exports.routes = router;
exports.products = products;