const express = require('express');
const app = express(); 
require('dotenv').config(); 

// dependencies
const passport = require('passport'); 
const cors = require('cors');
const mongoose = require('mongoose');
const logger = require('morgan');
const router = require('./routes/routes');

// database
const port = process.env.PORT;
const uri= process.env.URL_MONGODB;
mongoose.connect(uri,{useNewUrlParser:true}).then((data)=>console.log("CONNECTED")).catch(err=>console.log(err))

// middleware
app.use(logger('tiny'));
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cors()); 
// passport middleware
app.use(passport.initialize());
app.use(passport.session());
// ссылка на конфиг паспорта
require('./modules/passport')(passport);
 

// routes
app.use('/', express.static('public'));

app.use('/api', router);   

// response
app.get('/', (req,res)=>{
    res.send('WORK')
});


app.listen(port, ()=>console.log('SERVER START AT PORT', port));