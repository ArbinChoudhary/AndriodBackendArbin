const mongoose = require('mongoose');

const User= mongoose.model('User', {
    
    //Easy Signup
    fname: { 
        type: String,require:true
    },
	lname: { 
        type: String,require:true
    },
    username :{
        type: String,require:true,unique:true 
    },
    password :{
        type: String,require:true
    },

});

module.exports = User;