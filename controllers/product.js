const Product = require('../models/product');
const SizeCategory = require('../models/sizecategory');

exports.createProduct = async (req, res) => {
    try{
        const {title, price, image, size, color, category} = req.body;
        if(!title || !price || !image || !size || !color, !category) return res.status(400).send({msg:{"error":"All fields are required"}})
        const ifProductExist = await Product.findOne({title: title});
        if(ifProductExist) return res.status(400).send({msg:{"error":"Product already exist"}})
        const Addproduct = new Product({title, price, image, size: size, color: color, category: category});
        await Addproduct.save();
        res.status(201).send({msg:{"success":"Product created successfully"}, Addproduct});
    }catch(err){
        res.status(500).send(err)
    }
}

exports.getProducts = async (req, res) => {
    try{
        const {name} = req.query;
        const products = await Product.find(name && name !=="" ?{
            $or: [
                { title: { $regex: name, $options: "i" } },
                { size: { $regex: name, $options: "i" } },
                { color: { $regex: name, $options: "i" } },
                { category: { $regex: name, $options: "i" } },
            ],
        }: {}).populate('size').populate('color').populate('category');
        if(!products) return res.status(400).send({msg:{"error":"Products not found"}})
        res.send(products)
    }catch(err){
        res.status(500).send(err)
    }
}

exports.updateOneProduct = async (req, res) => {
    try {
      const id = req.params.id;
      
      const updatedCategoie = await Product.findByIdAndUpdate(id, req.body, {
        new: true,
        useFindAndModify: false,
      });
      res
        .status(200)
        .json({ msg: "Product updated with success", data: updatedCategoie });
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  };

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