'use strict'

const express = require('express');
const bodyParser = require('body-parser');

const app = express();

//Carregando rotas
const indexRoute = require('./routes/indexRoute');
const productRoute = require('./routes/productRoute');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}))


app.use('/',indexRoute);
app.use('/products',create);
module.exports = app;