const Product = require('../models/product');
const SizeCategory = require('../models/sizecategory');


exports.createProduct = async  (req, res) => {
    try{
        const {title, price, image, size, color, category, benefit, benefit2, benefit3, benefit4, benefit5, image2 } = req.body;
        const url = req.protocol + "://" + req.get("host");
        if(!title || !price || !image || !size || !color, !category) return res.status(400).send({msg:{"error":"All fields are required"}})
        const ifProductExist = await Product.findOne({title: title});
        if(ifProductExist) return res.status(400).send({msg:{"error":"Product already exist"}})
        const Addproduct = new Product({title, price, image: url + "/uploads/" + req.file.filename,image2: url + "/uploads/" + req.file.filename, size: size, color: color, category: category, benefit: benefit, benefit2: benefit2, benefit3: benefit3, benefit4: benefit4, benefit5: benefit5});
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
                { title: { $regex: query, $options: "i" } }
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
