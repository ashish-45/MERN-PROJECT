const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;
//const Schema = new mongoose.Schema();

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        maxlength: 32,
        required: true,
        unique: true
    },
    description: {
        type: String,
        trim: true,
        maxlength: 2000,
        required: true,
    },
    price: {
        type: Number,
        trim: true,
        required: true
    },
    catogary: {
        type: ObjectId,
        ref: 'Catogary',
        required: true
    },
    stock: {
        type: Number
    },
    sold: {
        type: Number,
        default: 0
    },
    photo: {
        data: Buffer,
        contentType: String
    }

}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);