'use strict'

const express = require('express');
const dotenv = require('dotenv')
const bodyParser = require('body-parser');

const app = express();

//config do dotenv -variaveis de ambiente
dotenv.config();

//Carrega models
const Product = require('./models/product'); 
const Costumer = require('./models/costumer');
const Order = require('./models/order');

//Carregando rotas
const indexRoute = require('./routes/indexRoute');
const productRoute = require('./routes/productRoute');
const costumerRoute = require('./routes/costumerRoute');
const orderRoute = require('./routes/orderRoute');

//Rota com o Banco de dados
const connectDatabase = require("./database/db")

//Conexão com o Banco de dados
connectDatabase()

app.use(bodyParser.json({
    limit:'5mb'
}));
app.use(bodyParser.urlencoded({extended:false}))


app.use('/',indexRoute);
app.use('/products',productRoute);
app.use('/costumer',costumerRoute);
app.use('/order',orderRoute);
module.exports = app;