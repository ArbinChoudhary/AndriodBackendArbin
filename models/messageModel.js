const mongoose = require('mongoose');

const  Message= mongoose.model('Message', {
    //Easy Signup
	name: { 
        type: String,require:true
    },
    email:{
        type: String,require:true,
        unique:true 
    },
    phone:{
        type: String, require:true
    },
    message: { 
        type: String,require:true
        },
});

module.exports = Message;