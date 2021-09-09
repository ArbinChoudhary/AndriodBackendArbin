const mongoose = require('mongoose');

const User= mongoose.model('User', {
    
    //Easy Signup
    firstname: { 
        type: String,require:true
    },
	lastname: { 
        type: String,require:true
    },
    email :{
        type: String,require:true,unique:true 
    },
    password :{
        type: String,require:true
    },
    mobileno: { 
        type: String ,require:true
    }
});

module.exports = User;