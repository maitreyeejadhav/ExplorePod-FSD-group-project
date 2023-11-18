const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const User = require('./models/User');
const app = express();

const bcrypt = require('bcrypt');
const saltRounds = 10;
const myPlaintextPassword = 's0/\/\P4$$w0rD';
const someOtherPlaintextPassword = 'not_bacon';

app.use(cors());
app.use(express.json());

//const uri = "mongodb+srv://maitree:L2puz8cprbhK0VX8@cluster0.x6di5ls.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect('mongodb+srv://maitree:L2puz8cprbhK0VX8@cluster0.x6di5ls.mongodb.net/?retryWrites=true&w=majority')

app.post('/register', async (req,res)=>{
    const{username,password}= req.body;
    try{
        const userDoc = await User.create({
            username, 
            password: bcrypt.hashSync(password, saltRounds)
        });
        res.json(userDoc);
    } catch(e){
        res.status(400).json(e);
    }
    
    
    
})

app.listen(4000);

//L2puz8cprbhK0VX8

//mongodb+srv://maitree:L2puz8cprbhK0VX8@cluster0.x6di5ls.mongodb.net/?retryWrites=true&w=majority


//mongodb+srv://maitree:7lIiscvDttcegSTz@cluster0.x7t2hpu.mongodb.net/?retryWrites=true&w=majority