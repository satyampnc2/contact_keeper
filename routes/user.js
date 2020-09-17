const express = require('express')
const router  =  express.Router()
const {check,validationResult} = require('express-validator')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const User  = require('../models/user')
const config = require('config')

router.get('/',async (req,res)=>{
    try{
        const user = await User.findById(req.user.id).select("-password");
        res.json(user);
    }catch(err){
        res.status(400).json({msg:'error occured'})
    }
})
router.post('/',[
    check('name','name is repuired').not().isEmpty(),
    check('email','email is requried').isEmail(),
    check('password','correct format password required').isLength({min:6})
],async (req,res)=>{
    const error = validationResult(req);
    if(!error.isEmpty()){
        let errors = error.array().map(err => err.msg)
        return res.status(400).json({error:errors});
    }
    try{
        const {name,email,password} = req.body;
        let user = await User.findOne({email});
        if(user){
            return res.status(400).json({error:'User alredy exist'});
            
        }
        user = new User({name,email,password});
        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(password,salt);
        user.password = hashedPass;
        await user.save();
        const payload = {
            id:user._id
        }
        jwt.sign(payload,config.get("jwtSecret"),(err,token)=>{
            if(err) throw err;
            res.json({token:token})
        })
    }
    catch(err){
        res.status(500).json({'error':'server error'})
    }
})

module.exports =  router;