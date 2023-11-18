const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const User = require('./models/User');
const app = express();
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');


const bcrypt = require('bcrypt');
const saltRounds = 10;
const myPlaintextPassword = 's0/\/\P4$$w0rD';
const someOtherPlaintextPassword = 'not_bacon';

const secret = 'asdfg345fghvbty67uhkjhg98s';  //created salt for jwt(jasonwebtoken)

app.use(cors({credentials: true, origin: 'http://localhost:3000'}));
app.use(express.json());
app.use(cookieParser());


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
    
});

app.post('/login', async (req,res) => {
    const {username,password} = req.body;
    const userDoc= await User.findOne({username});
    const passOk = bcrypt.compareSync(password, userDoc.password);
    if(passOk){
        // user logged in
        jwt.sign({username, id:userDoc._id}, secret, {}, (err,token) => {
            if(err) throw err;
            res.cookie('token', token).json({
                id:userDoc._id,
                username,
            });
        });
        
    }
    else{
        res.status(400).json('wrong credentials');
    }
});

app.get('/profile', (req,res) => {
    const {token} = req.cookies;
    jwt.verify(token, secret, {}, (err,info) => {
        if(err) throw err;
        res.json(info);
    });
    
});

app.post('/logout', (req,res) => {
    res.cookie('token', '').json('ok');
})


app.listen(4000);

