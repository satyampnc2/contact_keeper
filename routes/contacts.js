const express = require('express')
const router  =  express.Router()
const Contact = require('../models/contact');
const {check,validationResult} = require('express-validator')
const auth = require('../middlewares/auth')
const User = require('./user');

router.get('/',auth,async (req,res)=>{
    try{
        const contacts = await Contact.find({user:req.user.id});
        res.json(contacts);    
    } catch(err){
        res.status(500).json({error:'error occured'});
    }
})

router.post('/',[auth,[
    check('name','please provide name').not().isEmpty(),
    check('type','please provide either personal or professional').isIn(['personal','professional'])
]],async (req,res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        let error =  errors.array().map(err =>  err.msg)
        res.status(400).json({error:error})
        return;
    }
    try{
        const {name,email,phone,type} = req.body;
        const newContact =  new Contact({name,email,phone,type,user:req.user.id});
        const contact = await newContact.save();
        res.json(contact);
    } catch(err){
        res.status(500).json({error:err});
    }
})

router.put('/:id',auth,async (req,res)=>{    
    try{
        let contact = await Contact.findById(req.params.id);
        let updatedContact = {};
        const {name,email,phone,type} = req.body;
        if(name) updatedContact.name =  name;
        if(email) updatedContact.email = email;
        if(phone) updatedContact.phone = phone;
        if(type) updatedContact.type = type;

        if (!contact) return res.status(404).json({error: 'Contact not found'});

        if(contact.user.toString() !== req.user.id){
            res.status(401).json({error:'Unauthorized access, cannt edit contact'})
            return;
        }
        contact = await Contact.findByIdAndUpdate(req.params.id,{
            $set: updatedContact
        },{new:true});
        res.json(contact);
    } catch(err){
        res.status(500).json({error:'server error'});
    }
})

router.delete('/:id',auth,async (req,res)=>{
    const contact =  await Contact.findById(req.params.id);
    if(!contact){
        res.status(400).json({error:'contact not found'})
        return
    }
    if(contact.user.toString() !== req.user.id){
        res.status(401).json({error:'unauthorized access, cannt delete contact'})
        return
    }
    await Contact.findByIdAndRemove(req.params.id);
    res.json({msg:'Contact deleted successfully'})
})  
module.exports = router;