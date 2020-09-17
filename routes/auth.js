const express = require('express')
const router  =  express.Router()
const {check,validationResult} = require('express-validator')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const User  = require('../models/user')
const config = require('config')
const auth = require('../middlewares/auth');
router.get('/',auth,async (req,res)=>{
    try{
        const user = await User.findById(req.user.id).select("-password");
        res.json(user);
    }catch(err){
        res.status(400).json({msg:'error occured'})
    }
})

router.post('/',[
    check('email','email required').isEmail(),
    check('password','password is required').not().isEmpty()
],async (req,res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        let error = errors.array().map(err => err.msg)
        return res.status(400).json({error:error});
    }
    try{
        const {email,password} = req.body;
        const user = await User.findOne({email});
        if(!user){
            res.status(400).json({error:'email doesnt exists'})
            return
        }
        const isMatched = await bcrypt.compare(password,user.password);
        if(!isMatched){
            res.status(400).json({error:'password invalid'});
            return
        }
        const payload = {
            id:user._id
        }
        jwt.sign(payload,config.get("jwtSecret"),(err,token)=>{
            if(err) throw err;
            res.json({token:token});
        })
    } catch(err){
        res.status(500).json({error:err})
    }
})


module.exports = router;