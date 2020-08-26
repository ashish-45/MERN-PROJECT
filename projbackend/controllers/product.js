const Product = require('../models/product');
const formidable = require("formidable");
const _ = require('lodash');
const fs = require('fs');


exports.getProductById = (req,res,next,id) =>{
    Product.findById(id)
    .populate("catogary")
    .exec((err , product)=>{
        if(err){
            return res.status(400).json({
                error:"Product Not Found"
            })
        }
        req.product = product;
        next();
    })
}
exports.createProduct = (req,res) =>{
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;

    form.parse(req, (err,fields ,file) =>{
        if(err){
            return res.status(400).json({
                error:"problem with image"
            })
        }
        //destructure of field
        const {name,description,price,catogary,stock} = fields;
        if(!name || !description || !price || !catogary || !stock)
        {
            return res.status(400).json({
                error:"please include all field "
            })
        }
        let product = new Product(fields);

        //Handle file
        if(file.photo){
            if(file.photo.size > 3000000)
            {
                return res.status(400).json({
                    error:"File size to big"
                })
            }
            product.photo.data = fs.readFileSync(file.photo.path);
            product.photo.contentType = file.photo.type;
        }
        //SAVE TO THE DB
        product.save((err,product)=>{
            if(err){
                return res.status(400).json({
                    error:"Saving tshirt in DB failed"
                })
            }
            res.json(product);
        })
    })
}

exports.getProduct = (req,res) =>{
    req.product.photo = undefined
    return res.json(req.product);
}

//MIDDLEWARE
exports.photo = (req,res,next) =>{
    if(req.product.photo.data){
        res.set("Content-Type",req.product.photo.contentType)
        return res.send(req.product.photo.data)
    }
    next();
}

exports.deleteProduct = (req,res) =>{
    let product = req.product;
    product.remove((err,deleteProduct) =>{
        if(err){
            return res.status(400).json({
                error:"Failed to delete product"
            })
        }
        res.json({
            message:"Deletion was success",deleteProduct
        })
    })
}

exports.updateProduct = (req,res) =>{
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;

    form.parse(req, (err,fields ,file) =>{
        if(err){
            return res.status(400).json({
                error:"problem with image"
            })
        }
       //UPDATION CODE
        let product = req.product;
        product = _.extend(product,fields);

        //Handle file
        if(file.photo){
            if(file.photo.size > 3000000)
            {
                return res.status(400).json({
                    error:"File size to big"
                })
            }
            product.photo.data = fs.readFileSync(file.photo.path);
            product.photo.contentType = file.photo.type;
        }
        //SAVE TO THE DB
        product.save((err,product)=>{
            if(err){
                return res.status(400).json({
                    error:"Updation of product failed"
                })
            }
            res.json(product);
        })
    })
}

exports.getAllProducts = (req,res) =>{
    let limit = req.query.limit ?  parseInt(req.query.limit) :  8
    let sortBy = req.query.sortBy ? parseInt(req.query.sortBy) : 8
    Product.find()
    .select('-photo')
    .populate('catogary')
    .sort([[sortBy,"asc"]])
    .limit(limit)
    .exec((err,products)=>{
        if(err){
            return res.status(400).json({
                error:"no Product found"
            })
        }
        res.json(products);
    })
}

exports.updateStock = (req,res,next) =>{
    let myOperation = req.body.order.products.map(prod =>{
        return {
             updateOne: {
             filter: {_id: prod._id} ,
             update : {$inc :{stock: -prod.count,sold: +prod.count}}
            }
        }
    })
    Product.bulkWrite(myOperation , {} , (err,products)=>{
        if(err){
            return res.status(400).json({
                error:"Bulk Operation failed"
            })
        }
        next();
    })
}

exports.getAllUniqueCatogary = (req,res) =>{
    Product.distinct('catogary' , {} , (err,catogary) =>{
        if(err){
            return res.status(400).json({
                error:"No catogary found"
            })
        }
        res.json(catogary);
    } )
}