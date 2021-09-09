const mongoose = require('mongoose');

const  Books= mongoose.model('Books', {
    //Easy Signup
	roomtype: { 
        type: String,require:true
    },
    roomnum: { 
        type: String,require:true
        },
    desc:{
        type: String,require:true
    },

    photo:{
        type:String,require:true
    }
});

module.exports = Rooms;