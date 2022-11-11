const express = require('express');
const app = express();

const mongoose = require('mongoose');

const routes = require('./routes/routes');

app.use('/user', routes)

var url = 'mongodb://127.0.0.1:27017/Assignment8';

mongoose.connect(url, {useNewUrlParser: true});

const db = mongoose.connection;
db.on('error', (error) => console.log("Error" + error));
db.once('open', () => console.log("Connected to Database"));

app.use(express.json());
//================================ using bcrypt ====================================================
const bcrypt = require('bcrypt');
const saltRounds = 10;
const myPlaintextPassword = 's0/\/\P4$$w0rD';
const someOtherPlaintextPassword = 'not_bacon';




// Load hash from your password DB.
// bcrypt.compare(myPlaintextPassword, hash, function(err, result) {
//     // result == true
// });
// bcrypt.compare(someOtherPlaintextPassword, hash, function(err, result) {
//     // result == false
// });
//===========================================================================================
const credentials =  mongoose.Schema({
    username: {
       type: String,
       required: true
    },
    password: {
        type: String,
        required: true
    }

});

//======================================Create ===========================================
// app.post('/user/create', (req, res) => {
   

//     // compile schema to model
//     var User = mongoose.model('User', credentials, 'TestTable');
    

//     // a document instance
//     var user1 = new User({ username: req.body.username, password: smh});

//     try{
//         user1.save();
//         res.status(200).json({message: "Saved Successfully"});
//     }
//     catch(err){
//         res.status(400).json({message: "Error while saving"});
//     }
    
 
    
//     // console.log(req.body);
//     // res.send(req.body);
//     // res.status(200);
// })

//===========================================Create end =========================================

//=========================================== Get =============================================
// app.get('/user/getAll', (req,res) => {
    
//     console.log("in get");
//     res.sendStatus(200).send(data);
// })

app.listen(8000, () => console.log("App Started on Port 8000"));


