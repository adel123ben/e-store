const ColorsCategory = require('../models/colorsCategory');


exports.createColorsCategory = async (req, res) => {
   try{
    const { name } = req.body;
    if (!name) return res.status(400).send({msg:{"error":"All fields are required"}})
    const ifColorsCategoryExist = await ColorsCategory.findOne({ name });
    if (ifColorsCategoryExist) return res.status(400).send({msg:{"error":"Colors Category already exist"}})
    const newColorsCategory = new ColorsCategory({
        name
    })
    await newColorsCategory.save();
    res.send(newColorsCategory);
   }catch(err){
       res.status(500).send(err)
   }
}

exports.getColorsCategories = async (req, res) => {
    try{
        const colors = await ColorsCategory.find();
        if(!colors) return res.status(400).send({msg:{"error":"Colors not found"}})
        res.send({msg:"get withe success", data:colors})
    }catch(err){
        res.status(500).send(err)
    }
}