require('dotenv').config();

const express = require('express');
const morgan = require('morgan');
const path = require('path');

//Initializations

const app = express();
require('./db');

//Settings

app.set('port', process.env.PORT || 4000);

//Middlewares

app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//Routes

app.use('/api/collections', require('./routes/collection'));

//Static Files

app.use(express.static(path.join(__dirname, 'public')));

//Start server

app.listen(app.get('port'), ()=>{
    console.log('Server on port', app.get('port'));
});