const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;
//const Schema = new mongoose.Schema();
const ProductcCartSchema = new mongoose.Schema({
    product: {
        type: ObjectId,
        ref: 'Product'
    },
    name: String,
    count: Number,
    price: Number
});

const ProductCart = mongoose.model('ProductCart', ProductcCartSchema);


const orderSchema = new mongoose.Schema({
    products: [ProductcCartSchema],
    transaction_id: {},
    amount: { type: Number },
    address: {
        type: String,
        maxlength: 2000,
        trim: true,
        status:{
            type: String,
            default:"Received",
            enum: ['cncelled','Delivered','Shipped','Processing','Received']
        },
        updated: Date,
        user: {
            type: ObjectId,
            ref: 'User'
        }
    },

}, { timestamps: true });

const Order = mongoose.model('Order', orderSchema);
module.exports = { Order, ProductCart }