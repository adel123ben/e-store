const User =  require('../models/auth');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
   try{
    const {name, email, password} = req.body;
    if(!name || !email || !password) return res.status(400).send({msg:{"error":"All fields are required"}})
    const ifUserExist = await User.findOne({email});
    if(ifUserExist) return res.status(400).send({msg:{"error":"User already exist"}})
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const addNewUser = new User({
        name,
        email,
        password: hashedPassword
    });
    const savedUser = await addNewUser.save();
    res.status(201).send({msg:{"success":"User created successfully"}, savedUser})
    
   }catch(err){
       res.status(500).send(err)
   }
}

exports.login = async (req, res) => {
    try{
        const {email, password} = req.body;
        if(!email || !password) return res.status(400).send({msg:{"error":"All fields are required"}})
        const user = await User.findOne({email});
        if(!user) return res.status(400).send({msg:{"error":"User does not exist"}})
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) return res.status(400).send({msg:{"error":"Invalid credentials"}})
        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {
            expiresIn: '1d'});
            await user.save();
            const {password:passwordRemove, ...userWithoutPassword} = user._doc
        res.status(200).send({msg:{"success":"Login successful"}, data:userWithoutPassword, token})
    }catch(err){
        res.status(500).send(err)
    }

}