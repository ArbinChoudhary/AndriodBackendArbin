const express = require('express');
const router = express.Router();
const User = require('../models/userModel');
const bcrypt =require('bcryptjs');
const {check, validationResult}=require('express-validator');
const { aggregate } = require('../models/userModel');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth')
const upload = require('../middleware/uploads')




router.post('/user/registration',
[
    check('firstname',"FirstName must be provided").not().isEmpty(),
    check('email',"Enter a valid email").isEmail(),
    check('email',"email already exists!").custom(value =>{
        return User.findOne({email:value})
        .then(duplicateemail =>{
            if(duplicateemail){
                return Promise.reject("email already exists!")
            }
        });
    }),
    check('email',"Email must be provided").not().isEmpty(),
    check('password',"Password must be provided").not().isEmpty(),
    check('password',"Password must be of at least six characters").isLength({ min:5 })
],
function(req,res){

    const errors = validationResult(req);
    if (errors.isEmpty()) {
        var userData = new User({
            firstname : req.body.firstname,
            lastname : req.body.lastname,
            email : req.body.email,
            password : req.body.password,
            mobileno : req.body.mobileno,
            
        });
       
        bcrypt.genSalt(10,(err,salt)=>{
            bcrypt.hash(userData.password,salt,(err,hash)=>{
                if(err) throw err;
                userData.password=hash;
                userData.save().then(function(){
                    const message='User is added'; 
                  
                    res.status(201).json({message : message,success : true})
                    console.log(message);
					
					
                }).catch(function(err){
                    
                    res.status(500).json({message:err})
                });
            })
        })  
    }
    else{
        console.log(errors.array());
        res.status(400).json(errors.array());
    }
    
});


//Login
router.post('/user/login',function(req,res){

    
	const email = req.body.email;
	const password = req.body.password;
    



	User.findOne({email: email}).then(function(userModel){

		if(userModel==null){
			return res.status(403).json({message : "Invalid Credentials!! Null"})
		}

		//res.send("Login Successful")
		bcrypt.compare(password,userModel.password,function(err,result){

			if (result===false){
				return	res.status(403).json({
					message :"Invalid Credentials!! Result False"})
			}
			//res.send("Authenticated")

			//email and password valid
			const token =jwt.sign({userId:userModel._id},'secretkey');
           console.log(userModel._id)
			console.log("Token : " + token)
			res.status(200).json({
				success:true,
				token: token,
                id:userModel._id,
               
			})
			console.log("Login Successfully")
		})
	})
	.catch()
})


router.get('/user/showall',function(req,res){

    User.find()
    .then(function(messageData){
        res.status(200).json(messageData);
    })
    .catch(function(e){
        res.status(500).json({message:e});
    })
})


router.delete('/user/delete/:id', function(req,res){
	const id = req.params.id;
	User.deleteOne({_id: id}).then(function(){
		res.send("Deleted")
	})
})





router.put('/user/update/:id', function(req,res){
console.log("Update gar")

    const id = req.params.id;
	const firstname = req.body.firstname;
    const lastname = req.body.lastname;
	const mobileno = req.body.mobileno;
  

	User.updateOne({_id:id},{
       
       firstname : firstname,
       lastname:lastname,
    mobileno : mobileno
       
        
    })
    .then(function(data){
        res.status(200).json({message:"Updated!"})
		
	})
    .catch(function(e){
        res.status(500).json({message:e});

    })
})




router.get("/user/account",auth.verifyUser,function(req,res){    
    const token = req.headers.authorization.split(" ")[1];
    const decode = jwt.verify(token,"secretkey");
    const id = decode.userId
    User.findOne({_id:id})
    .then(function(result){
        res.status(200).json({success:true,data:result});
    })
    .catch(function(err){
        res.status(401).json({message : err,success:false})
    })
});


//Update by id get
router.get("/user/single/:id",function(req,res){
    console.log("single")
    const id = req.params.id;
    User.findOne({_id:id})
    .then(function(data){
        res.status(200).json(data);
    })
    .catch(function(e){
        res.status(201).json({message:"error here"});
    })
});



module.exports = router;