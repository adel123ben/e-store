const mongoose = require('mongoose');


const formulaireSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    quntity: {
      type: Number,
      required: true  
    },
    wilaya: {
        type: String,
        required: true
    },
    commune: {
        type: String,
        required: true
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    }
}, {
    timestamps: true
});


const Formulaire = mongoose.model('Formulaire', formulaireSchema);
module.exports = Formulaire