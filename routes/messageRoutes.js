const express = require('express');
const router = express.Router();
const {check, validationResult}=require('express-validator');
const { model } = require('mongoose');
const auth = require('../middleware/auth')
const upload = require('../middleware/uploads');
const Messages = require('../models/messageModel');

router.post('/message/add',(req, res) => {

    const name =req.body.name;
    const email =req.body.email;
    const phone = req.body.phone;
    const message = req.body.message;

    const coment = new Messages({
        name:name,
        email:email,
        phone:phone,
        message:message
    });
    coment.save()
    .then(function(result){
        res.status(201).json(result)
    })
    .catch(function(err){
        res.status(500).json({message:err})
    })


})


router.get('/messages/showalls',function(req,res){
    Messages.find()
    .then(function(data){
        res.status(200).json(data);
    })
})

router.put('/messages/update/:id',upload.single('photo'), function(req,res){

    if(req.file === undefined){
        res.status(400).json({message:"invalid file"})
    }
	const id = req.params.id;
	const name =req.body.name;
    const email =req.body.email;
    const phone = req.body.phone;
    const message = req.body.message;
    

	Messages.updateOne({_id:id},{
        name:name,
        email:email,
        phone:phone,
        message:message,
    })
    .then(function(data){
        res.status(200).json({message:"Updated!"})
		
	})
    .catch(function(e){
        res.status(500).json({message:e});

    })
})

router.delete('/messages/delete/:id',auth.verifyUser,function(req,res){
    const id =req.params.id
    Messages.deleteOne({_id:id})
    .then(function(data){
        res.status(200).json({message:"Deleted"});
    })
    .catch(function(e){
        res.status(500).json({message:e});
        
    })
})


router.get('/messages/showall',function(req,res){
    Messages.find()
    .then(function(message){
        res.status(200).json(message);
    })
    .catch(function(e){
        res.status(500).json({message:e});
    })
})


//Update by id get
router.get("/messages/single/:id",function(req,res){
    console.log("single")
    const id = req.params.id;
    Messages.findOne({_id:id})
    .then(function(data){
        res.status(200).json(data);
    })
    .catch(function(e){
        res.status(201).json({message:"error here"});
    })
});

module.exports =router;
