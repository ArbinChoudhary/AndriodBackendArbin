const express = require('express');
const router = express.Router();
const {check, validationResult}=require('express-validator');
const { model } = require('mongoose');
const Books = require('../models/roomsModel');
const auth = require('../middleware/auth')
const upload = require('../middleware/uploads');


router.post('/room/add',upload.single('photo'),(req, res) => {
    if(req.file==undefined){
        return res.status(400).json({
            message:"Invalid Image Format!!"      
        })
    }
    const roomtype =req.body.roomtype;
    const roomnum = req.body.roomnum;
    const photo =req.file.path;


    const room = new rooms({
        roomtype:roomtype,
        roomnum:roomnum,
        desc:desc,
        photo :photo
    });
    room.save()
    .then(function(result){
        res.status(201).json({message:"Rooms Added!!"})
    })
    .catch(function(err){
        res.status(500).json({message:err})
    })


})


router.get('/rooms/showalls',function(req,res){
    Roomm.find()
    .then(function(room){
        res.status(200).json({success:true,data:room});
    })
})

router.put('/rooms/update/:id',auth.verifyUser,upload.single('photo'), function(req,res){
    console.log(id)

    if(req.file === undefined){
        res.status(400).json({message:"invalid file"})
    }
	const id = req.params.id;
	const roomtype =req.body.roomtype;
    const roomnum=req.body.roomnum;

    

	Roomm.updateOne({_id:id},{
        roomtype : roomtype,
        roomnum:roomnum,
        photo:req.file.path,
    })
    .then(function(data){
        res.status(200).json({message:"Updated!"})
		
	})
    .catch(function(e){
        res.status(500).json({message:e});

    })
})

router.delete('/rooms/delete/:id',auth.verifyUser,function(req,res){
    const id =req.params.id
    Roomm.deleteOne({_id:id})
    .then(function(data){
        res.status(200).json({message:"Deleted"});
    })
    .catch(function(e){
        res.status(500).json({message:e});
        
    })
})




router.get('/rooms/showall',function(req,res){
    Roomm.find()
    .then(function(book){
        res.status(200).json(book);
    })
    .catch(function(e){
        res.status(500).json({message:e});
    })
})


//Update by id get
router.get("/rooms/single/:id",function(req,res){
    console.log("single")
    const id = req.params.id;
    Roomm.findOne({_id:id})
    .then(function(data){
        res.status(200).json(data);
    })
    .catch(function(e){
        res.status(201).json({message:"error here"});
    })
});

module.exports =router;
