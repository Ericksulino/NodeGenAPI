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

//Carregando rotas
const indexRoute = require('./routes/indexRoute');
const productRoute = require('./routes/productRoute');

//Rota com o Banco de dados
const connectDatabase = require("./database/db")

//Conexão com o Banco de dados
connectDatabase()

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}))


app.use('/',indexRoute);
app.use('/products',productRoute);
module.exports = app;