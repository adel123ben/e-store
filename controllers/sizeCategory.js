const SizeCategory = require('../models/sizecategory');

exports.createSizeCategory = async (req, res) => {
  try{
    const { name } = req.body;
    if (!name) return res.status(400).send({msg:{"error":"All fields are required"}})
    const ifSizeCategoryExist = await SizeCategory.findOne({ name });
    if (ifSizeCategoryExist) return res.status(400).send({msg:{"error":"Size Category already exist"}})
    const sizeCategory = new SizeCategory({ name });
    await sizeCategory.save();
    res.send({msg:"Size Category created successfully", data:sizeCategory});
  }catch(err){
      res.status(500).send(err)
  }
}

exports.getSizes = async (req, res) => {
  try{
    const sizes = await SizeCategory.find();
    if(!sizes) return res.status(400).send({msg:{"error":"Sizes not found"}})
    res.send({msg:"get withe success", data:sizes});
  }catch(err){
      res.status(500).send(err)
  }
}