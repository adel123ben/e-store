const Formulaire = require('../models/formulaire');


exports.createFormulaire = async (req, res) => {
    try {
        const { name, phone, wilaya, commune, quntity, product } = req.body;
        if(!name || !phone || !wilaya || !commune || !quntity || !product) return res.status(400).send({msg:{"error":"All fields are required"}})
        const formulaire = new Formulaire({ name, phone, wilaya, commune, quntity, product: product });
        await formulaire.save();
        res.status(201).send(formulaire);
    } catch (error) {
        res.status(500).send(error); 
    }
}


exports.showFormulaires = async (req, res) => {
    try {
        const formulaires = await Formulaire.find().populate('product');
        res.status(200).send(formulaires);
    } catch (error) {
        res.status(500).send(error);
    }
}