const Product = require('../models/product');
const SizeCategory = require('../models/sizecategory');

exports.createProduct = async (req, res) => {
    try{
        const {name, price, image, size, color, category} = req.body;
        if(!name || !price || !image || !size || !color, !category) return res.status(400).send({msg:{"error":"All fields are required"}})
        const ifProductExist = await Product.findOne({name});
        if(ifProductExist) return res.status(400).send({msg:{"error":"Product already exist"}})
        const Addproduct = new Product({name, price, image, size: size, color: color, category: category});
        await Addproduct.save();
        res.status(201).send({msg:{"success":"Product created successfully"}, Addproduct});
    }catch(err){
        res.status(500).send(err)
    }
}

exports.getProducts = async (req, res) => {
    try{
        const {query} = req.query;
        const products = await Product.find(query && query !=="" ?{
            $or: [
                { name: { $regex: query, $options: "i" } },
                { size: { $regex: query, $options: "i" } },
                { color: { $regex: query, $options: "i" } },
                { category: { $regex: query, $options: "i" } },
            ],
        }: {}).populate('size').populate('color').populate('category');
        if(!products) return res.status(400).send({msg:{"error":"Products not found"}})
        res.send(products)
    }catch(err){
        res.status(500).send(err)
    }
}

exports.updateProduct = async (req, res) => {
    try{
        const id = req.params.id;
        const {name, price, image, size, color, category} = req.body;
        if(!name || !price || !image || !size, !color, !category) return res.status(400).send({msg:{"error":"All fields are required"}})
        const product = await Product.findByIdAndUpdate(id, {name, price, image, size: size, color: color, category: category});
        if(!product) return res.status(400).send({msg:{"error":"Product not found"}})
        res.status(200).json({msg:"update withe success",data:product})
    }catch(err){
        res.status(500).send(err)
    }
}

exports.deleteProduct = async (req, res) => {
    try{
        const id = req.params.id;
        const product = await Product.findByIdAndDelete(id);
        if(!product) return res.status(400).send({msg:{"error":"Product not found"}})
        res.status(200).json({msg:"delete withe success",data:product})
    }catch(err){
        res.status(500).send(err)
    }
}

exports.getProductWithId = async (req, res) => {
    try{
        const id = req.params.id;
        const product = await Product.findById(id).populate('size').populate('color').populate('category');
        if(!product) return res.status(400).send({msg:{"error":"Product not found"}})
        res.status(200).json({msg:"get withe success",data:product})
    }catch(err){
        res.status(500).send(err)
    }
}