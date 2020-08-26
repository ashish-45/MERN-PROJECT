const User = require('../models/user');
const Order = require('../models/order');
exports.getUserById = (req, res, next, id) => {
    User.findById(id).exec((err, user) => {
        if (err || !user) {
            return res.status(400).json({
                error: "NO user found in DB"
            })
        }
        req.profile = user
        next();
    });
};

exports.getUser = (req, res) => {

    //TO DO : get back here for password
    req.profile.salt = undefined;
    req.profile.secure_password = undefined;
    req.profile.createdAt = undefined;
    req.profile.updatedAt = undefined;
    return res.json(req.profile);
}

exports.UpdateUser = (req, res) => {
    User.findByIdAndUpdate(
        { _id: req.profile._id },
        { $set: req.body },
        { new: true, useFindAndModify: false },
        (err, user) => {
            if (err) {
                return res.json({
                    error: "You are not authorized update this information"
                })
            }
            user.salt = undefined;
            user.secure_password = undefined;
            user.createdAt = undefined;
            user.updatedAt = undefined;
            res.json(user)
        }
    )
}

exports.userPurchaseList = (req, res) => {
    Order.find({ user: req.profile._id })
        .populate('user', "_id name")
        .exec((err, order) => {
            if (err) {
                return res.json({
                    error: "No user in this account"
                })
            }
            return res.json(order);
        })

}

exports.pushOrderInPurchaseList = (req, res, next) => {
    let purchase = [];
    req.body.order.products.forEach(product => {
        purchase.push({

            _id: product._id,
            name: product.name,
            description: product.description,
            catogarty: product.catogarty,
            quantity: product.quantity,
            amount: req.body.order.amount,
            transaction_id: req.body.order.transaction_id
        });
    });

    //STORE THIS IN DB
    User.findOneAndUpdate(
        { _id: req.profile._id },
        { $push: { purchase: purchase } },
        { new: true },
        (err, purchsae) => {
            if (err) {
                return res.status(400).json({
                    error: "Not able to save purchase list"
                });

            }
            next();
        }

    )


}

