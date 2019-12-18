require('dotenv').config();

const express = require('express');
const morgan = require('morgan');
const path = require('path');
const cors = require('cors');

//Initializations

const app = express();
require('./db');

//Settings

app.set('port', process.env.PORT || 4000);

//Middlewares
app.use(cors());
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json({ limit: '10mb' }));


//Routes

app.use('/api/collections', require('./routes/collection'));
app.use('/api/archetype', require('./routes/archetype'));

//Static Files

app.use(express.static(path.join(__dirname, 'public')));

//Start server

app.listen(app.get('port'), ()=>{
    console.log('Server on port', app.get('port'));
});