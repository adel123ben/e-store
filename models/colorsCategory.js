const mongoose = require('mongoose');

const colorsCategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

const ColorsCategory = mongoose.model('ColorsCategory', colorsCategorySchema);
module.exports = ColorsCategory