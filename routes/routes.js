const express = require('express');
const Model = require('../models/model');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');

const router = express.Router()

router.use(express.json());

//Salt value
const saltRounds = 10;

//Post Method
router.post('/create', async (req, res) => {
    var hashpassword = "";
    bcrypt.genSalt(saltRounds, function (err, salt) {
        bcrypt.hash(req.body.Password, salt, function (err, hash) {
            // returns hash
            if(!validatePass(req.body.Password)){
                res.send("Please enter valid Password")
                return "Please enter valid Password";
            }
            const data = new Model({
                FullName: req.body.FullName,
                Email: req.body.Email,
                Password: hash
            })

            try {

                const dataToSave = data.save().then((result) => {
                    res.status(200).json("Successfully Saved " + result);

                }).catch(err => {
                    console.log("In catch after save " + err);
                    res.send(err.message);
                    // throw new Error('Some error');
                });
                // res.status(200).json(dataToSave)
            }
            catch (error) {
                res.status(400).send("Please enter valid email");
                // res.status(400).json({message: error.message})
            }
            // hashpassword = hash;

            console.log("In Hash " + hashpassword);
            return
        });
    });
    console.log("Hash Password after bcrypt fun " + hashpassword);

    console.log(req.body);

    //res.send('Post API')
})

//Get all Method
router.get('/getAll', async (req, res) => {
    try {
        const data = await Model.find();
        res.json(data)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
})

//Get by ID Method
// router.get('/getOne/:id', (req, res) => {
//     res.send('Get by ID API')
// })

//Update by ID Method
router.put('/edit/:id', (req, res) => {
    if (!validateName(req.body.FullName)){
        res.status(400).send("Enter Valid Name");
        return
    }
    if (!validatePass(req.body.Password)){
        res.status(400).send("Enter Valid Password");
        return
    }
    console.log(req.params.id);
    bcrypt.genSalt(saltRounds, function (err, salt) {
        bcrypt.hash(req.body.Password, salt, function (err, hash) {
            try {
                const id = mongoose.Types.ObjectId(req.params.id);
                const updatedData = {
                    "FullName" : req.body.FullName,
                    "Password" : hash
                }
                const options = { new: true };
        
                const result = Model.findByIdAndUpdate(
                    id, updatedData,  function(err, result) {
                        if (err) {
                          res.send(err);
                        } else {
                            if(result == null){
                                res.send("No Data Found");
                            }
                            else{
                                res.send(result);
                            }
                          
                        }
                      }
                );
        
        
            }
            catch (error) {
                res.status(400).json({ message: error.message })
            }

        })
    });
   
})

//Delete by ID Method
router.delete('/delete/:email', (req, res) => {
    try {
        const email = req.params.email;
        const data = Model.findOneAndDelete({Email: email}).then((file) => {
            if (file){
                console.log("deleted ");
                res.send(`Document with ${file.FullName} has been deleted..`)

            }
            else{
                console.log("does not exist");
                res.send(`Document does not exist`);
            }
        }).catch((err) => {
            console.log("Not deleted")
            res.send(err);
        });
        
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }})

function validateName(fullname) {
    var regname = /(^[a-zA-Z\s]+$)/;
    if (!fullname.match(regname)){
        return false;
    }
    return true
    

}

function validatePass(password){
    var redExPass = /(?=^.{6,255}$)((?=.*\d)(?=.*[A-Z])(?=.*[a-z])|(?=.*\d)(?=.*[^A-Za-z0-9])(?=.*[a-z])|(?=.*[^A-Za-z0-9])(?=.*[A-Z])(?=.*[a-z])|(?=.*\d)(?=.*[A-Z])(?=.*[^A-Za-z0-9]))^.*/;
    if (!password.match(redExPass)){
        return false;
    }
    return true;

}



module.exports = router;
