const mongoose = require('mongoose');
//const Schema = new mongoose.Schema();

const catogarySchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true,
        maxlength: 32,
        unique: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Catogary', catogarySchema);