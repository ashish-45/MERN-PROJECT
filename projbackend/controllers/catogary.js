const Catogary = require('../models/catogary');

exports.getCatogaryById = (req, res, next, id) => {

    Catogary.findById(id).exec((err, cate) => {
        if (err) {
            return res.status(400).json({
                error: "Catogary not found in DB"
            })
        }
        req.catogary = cate;
        next();
    })
}
exports.createCatogary = (req,res)=>{
    const catogary = new Catogary(req.body);
    catogary.save((err,catogary)=>{
        if(err){
            return res.status(400).json({
                error:"Not able to save ctogary in DB"
            });
        }
        res.json(catogary);
    });
}

exports.getCatogary = (req,res)=>{
    return res.json(req.catogary);
}

exports.getAllCatogary = (req,res)=>{
    Catogary.find().exec((err,catogaries)=>{
        if(err){
            return res.status(400).json({
                error:"No catogary found"
            })
        }
        res.json(catogaries);
    })
}

exports.updateCatogary = (req,res)=>{
    const catogary = req.catogary;
    catogary.name = req.body.name;
    catogary.save((err,updateCatogary)=>{
        if(err){
            return res.status(400).json({
                error:"Failes to update catogary"
            })
        }
        res.json(updateCatogary);
    })
}

exports.removeCatogary = (req,res)=>{
    const catogary = req.catogary;
    catogary.remove((err,catogary)=>{
        if(err){
            return res.status(400).json({
                error:"Failed to delete this catogary"
            });
        };
        res.json({
            message:"Successfull deleted"
        })
    });
};