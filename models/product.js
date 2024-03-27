const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    image2: {
        type: String,
        required: false
    },
    benefit: {
        type: String,
        required: true
    },
    benefit2: {
        type: String,
        required: true
    },
    benefit3: {
        type: String,
        required: true
    },
    benefit4: {
        type: String,
        required: true
    },
    benefit5: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
    
}, {
    timestamps: true
});

const Product = mongoose.model('Product', productSchema);
module.exports = Product