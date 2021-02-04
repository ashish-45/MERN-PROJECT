const User = require("../models/user")
const { check, validationResult } = require('express-validator');
var expressJwt = require('express-jwt');
var jwt = require('jsonwebtoken');


//SIGNUP VALIDATION
exports.signup = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({
            error: errors.array()[0].msg
        })
    }
    console.log('req.body: ', req.body)
    const user = new User(req.body)
    user.save((err, user) => {
        if (err) {
            console.log("ERROR:", err)
            return res.status(400).json({
                err: "not able to connect"
            });
        } 
        res.json({
            id:user._id,
            name: user.name,
            email: user.email,
            password: user.password

        });
    });
}

//SIGNIN VALIDATION
exports.signin = (req,res) => {
    const errors = validationResult(req);
    const {email,password}= req.body;
    if (!errors.isEmpty()) {
        return res.status(422).json({
            error: errors.array()[0].msg
        })
    }

    User.findOne({email},(err,user)=>{
        if(err){
            res.status(400).json({
                error : "User email does not exists"
            })
        }
        else if (!user.authenticate(password)) {
            return res.status(401).json({
                error: "Email and password does not match"
            });
        }
        //CREATE A TOKEN
        const token = jwt.sign({ _id: user._id }, process.env.SECRET);

        //PUT TOKEN IN COOKIE
        res.cookie('token', token, { expire: new Date() + 9999 });

        //SEND RESPONSE TO FRONT END
        //console.log("user ",user)
        const { _id, name, email,role } = user;
        return res.json({ token, user: { _id, name, email,role } })

    })
}
// SIGNOUT VALIDATION
exports.signout = (req, res) => {
    res.clearCookie("token");
    res.json({
        message: "User Signout Successfully.."
    });
};

// PROTECTED ROUTE
exports.isSignedIn = expressJwt({
    secret: process.env.SECRET,
    userProperty: "Auth"
});

//CUSTOM MIDDLEWARE
exports.isAuthenticated = (req, res, next) => {
    let checker = req.profile && req.Auth && req.profile._id == req.Auth._id;
    if (!checker) {
        return res.status(403).json({
            error: "ACCESS DENIED"
        });
    }
    next();
};

exports.isAdmin = (req, res, next) => {
    if (req.profile.role === 0) {           
        return res.json({
            error: "you are not ADMIN"
        })
    }
    next();
}
// 