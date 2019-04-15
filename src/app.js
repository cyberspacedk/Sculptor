const express = require('express');
const app = express();
const port = 7000;

// dependencies
const cors = require('cors');
const mongoose = require('mongoose');
const logger = require('morgan');

// middleware
app.use(logger);
app.use(express.json());


// response
app.get('/', (req,res)=>{
    res.send('WORK')
});


app.listen(port, ()=>console.log('SERVER START AT PORT', port));