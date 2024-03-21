const Formulaire = require('../models/formulaire');


exports.createFormulaire = async (req, res) => {
    try {
        const { name, phone, wilaya, commune, quntity, product, isMarked } = req.body;
        if(!name || !phone || !wilaya || !commune || !quntity || !product) return res.status(400).send({msg:{"error":"All fields are required"}})
        const formulaire = new Formulaire({ name, phone, wilaya, commune, quntity, product: product, isMarked });
        await formulaire.save();
        res.status(201).send(formulaire);
    } catch (error) {
        res.status(500).send(error); 
    }
}

exports.changeFormulaire = async (req, res) => {
    try {
        const id = req.params.id;
       const {isMarked} = req.body;
        const formulaire = await Formulaire.findByIdAndUpdate(id, {isMarked}, {new: true});
        res.status(200).send(formulaire);
    } catch (error) {
        res.status(500).send(error);
    }
}


exports.showFormulaires = async (req, res) => {
    try {
        const formulaires = await Formulaire.find().populate('product').populate("isMarked");
        res.status(200).send(formulaires);
    } catch (error) {
        res.status(500).send(error);
    }
}