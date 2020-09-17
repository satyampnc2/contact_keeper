const mongoose = require('mongoose')

const contactSchema = mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    name:{
        type:String,
        isRequired:true
    },
    email:{
        type:String
    },
    phone:{
        type:String
    },
    type:{
        type:String,
        default:'personal'
    },
    date:{
        type:Date,
        default:Date.now
    }
});

const Contact = module.exports =  mongoose.model('Contact',contactSchema);