const mongoose = require('mongoose');

const sizeCategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

const SizeCategory = mongoose.model('SizeCategory', sizeCategorySchema);
module.exports = SizeCategory