var express = require('express')
const { check, validationResult } = require('express-validator');
var router = express.Router();

const { signout, signup, signin, isSignedIn } = require("../controllers/auth");

router.post('/signin',
    [

        check("email", "email is required").isEmail(),
        check("password", "password is required").isLength({ min: 5 })
    ],
    signin,

);
router.post('/signup',
    [
        check("name", "name should be atleast 3 character").isLength({ min: 3 }),
        check("email", "email is required").isEmail(),
        check("password", "password should be atleast 5 character").isLength({ min: 5 })
    ],
    signup
);
router.get('/signout', signout);

router.get("/testroute", isSignedIn, (req, res) => {
    res.send(req.Auth);
})



module.exports = router;