const mongoose = require('mongoose');

const  Roomm= mongoose.model('Roomm', {
    //Easy Signup
	roomtype: { 
        type: String,require:true
    },
    roomnum: { 
        type: String,require:true
        },

    photo:{
        type:String,require:true
    }
});

module.exports = Roomm;