const jwt = require('jsonwebtoken');
const User =require('../models/userModel')


module.exports.verifyUser =function(req,res,next){
   
    try{

        const token =req.headers.authorization.split(" ")[1];
        const decodeData=jwt.verify(token,'secretkey');
        User.findOne({_id:decodeData.customerID})
        .then(function(result){
        res.User = result
        next()
    })
        .catch(function(err){
        res.status(401).json({message:err})
    })
    }

    catch(err){
        res.status(401).json({message:"Unauthorized Access!"})
    }
}

