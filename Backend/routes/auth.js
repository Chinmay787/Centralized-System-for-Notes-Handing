const express=require('express');
const router=express.Router()
const User=require("../models/User");
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { exists } = require('../models/User');
const fetchuser=require('../middleware/fetchuser')

const JWT_SECRET="chinmay";

//ROUTE 1:-create a user using:POST "/api/auth/createuser"

router.post('/createuser',[
    body('email').isEmail(),
    body('name').isLength({ min: 2 }),
    body('password').isLength({ min: 5 }),
], async (req,res)=>{
  let success=false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success,errors: errors.array() });
    }
    try {
    let user=await User.findOne({email:req.body.email})
    if (user){
      return res.status(400).json({success,error:"User Already Taken!"})
    }
    // secured password variable
    const salt=await bcrypt.genSalt(10);
    const secPass=await bcrypt.hash(req.body.password, salt)

    //create new user
    user= await User.create({
        name: req.body.name,
        password: secPass,
        email:req.body.email,
      });
      const data={
        id:user.id
      }
      const authtoken=jwt.sign(data,JWT_SECRET);
      success=true;
      res.json({success,authtoken})
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Internal Server Error!")
    }
})

//ROUTE 2:-create a user using:POST "/api/auth/login"
router.post('/login',[
  body('email').isEmail(),
  body('password','password cannot be blank',exists).isLength({ min: 5 }),
], async (req,res)=>{
  const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

const {email,password} = req.body;
try {
  let user=await User.findOne({email});
  if(!user){
    return res.status(400).json({error:"Invalid Credentials!"});
  }
  const passwordCompare=await bcrypt.compare(password,user.password);
  if(!passwordCompare){
    success=false;
    return res.status(400).json({success,error:"Invalid Credentials!"});
  }
  const data={
    user:{
      id:user.id
    }
  }
  const authtoken=jwt.sign(data,JWT_SECRET);
  success=true;
  res.json({success,authtoken});
}catch (error) {
  console.log(error.message);
  res.status(500).send("Internal Server Error")
} 
});

//ROUTE 3:-Get Login user details:POST "/api/auth/getuser" Login Required
router.post('/getuser',fetchuser,async (req,res)=>{
try {
  const userId=req.user.id
  const user=await User.findById(userId).select("-password")
  res.send(user)
} catch (error) {
  console.log(error.message);
  res.status(500).send("Internal Server Error")
}
})
module.exports = router;