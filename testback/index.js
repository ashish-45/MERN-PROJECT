const express = require('express');

const app = express();

const port = 5000;

app.get('/login', (req,res) =>{
    return res.send('Welcome login');
});

app.get('/check', (req,res) =>{
    return res.send('Welcome login');
});

const admin = (req,res)=>{
    return res.send("Go Admin page dashbord");
}

const ashish = (req,res,next)=>{
    console.log("Hii Ashish");
    next();
};

app.get('/admin',ashish,admin)

app.get('/', (req,res) =>{ 
    return res.send('Hello Ashish');
});

app.get('/SignOut', (req,res) =>{
    return res.send('You are Sign Out...');
});

app.listen(port,()=>{
    console.log('Server is up and running....');
});