const mongoose = require('mongoose');
const Product = require('./product');

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
    isMarked: {
        type: Boolean,
        default: false
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    },
    total: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
});

// Hook pour mettre à jour le total avant de sauvegarder le formulaire
formulaireSchema.pre('save', async function(next) {
    try {
        const product = await Product.findById(this.product);
        if (!product) {
            throw new Error('Produit non trouvé');
        }
        // Calcul du total en fonction du prix du produit et de la quantité commandée
        this.total = product.price * this.quntity;
        next();
    } catch (error) {
        next(error);
    }
});

const Formulaire = mongoose.model('Formulaire', formulaireSchema);
module.exports = Formulaire;
