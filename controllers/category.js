const Category = require('../models/category');

exports.createCategory = async (req, res) => {
    try{
        const { name } = req.body;
        if (!name) return res.status(400).send({msg:{"error":"All fields are required"}})
        const ifCategoryExist = await Category.findOne({ name });
        if (ifCategoryExist) return res.status(400).send({msg:{"error":"Category already exist"}})
        const newCategory = new Category({
            name
        })
        await newCategory.save();
        res.send({msg:"Category created successfully", data:newCategory});
    }catch(err){
        res.status(500).send(err)
    }
}


exports.getCategories = async (req, res) => {
    try{
        const categories = await Category.find();
        if(!categories) return res.status(400).send({msg:{"error":"Categories not found"}})
        res.send({msg:"get withe success", data:categories});
    }catch(err){
        res.status(500).send(err)
    }
}