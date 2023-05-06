'use strict'

const ValidationContrac = require('../validators/fluent-validator');
const repository = require('../repositories/costumerRep');
const md5 = require('md5');
const authService = require("../services/authServ");

exports.get = async (req, res, next) =>{
    try{
        const data = await repository.get();
        res.status(200).send(data);
    }
    catch (err) {
        res.status(400).send({message: "find fail!", error: err.message});
    };
};

exports.getById = async (req, res, next) =>{
    try{
        const data = await repository.getById(req.params.id);
        res.status(200).send(data);
    }
    catch(err) {
        res.status(400).send({message: "find fail!", error: err.message});
    };
};

exports.post = async (req, res, next) =>{
    let contract = new ValidationContrac();
    contract.hasMinLen(req.body.name, 3, 'O Nome deve conter pelo menos 3 caracteres');
    contract.isEmail(req.body.email, 'Email inválido!');
    contract.hasMinLen(req.body.password, 8, 'A senha deve conter pelo menos 8 caracteres');

    //Se os dados forem invalidos
    if(!contract.isValid()){
        res.status(400).send(contract.errors()).end();
        return;
    }
    
    try {
        await repository.create({
            name: req.body.name,
            email: req.body.email,
            password: md5(req.body.password + process.env.SECRET_JWT),
            roles:["user"]
        })
        res.status(201).send({message: "create sucessfull!"});
    }
    catch(err){
        res.status(400).send({message: "create fail!", error: err.message});
    };
};

exports.put = async (req, res, next) =>{
    try{
        await repository.update(req.params.id,req.body)
        res.status(200).send({message: "update sucessfull!"});
    }
    catch(err){
        res.status(400).send({message:"upadte fail",error: err.message});
    }
};

exports.delete = async (req, res, next) =>{
    try {
        await repository.delete(req.params.id)
        res.status(200).send({message: "delete sucessfull!"});
    }
    catch(err){
        res.status(400).send({message:"delete fail",error: err.message});
    }
};

exports.authenticate = async (req, res, next) =>{

    try {
        const costumer = await repository.auth({
            email: req.body.email,
            password: md5(req.body.password + process.env.SECRET_JWT)
        })
        if(!costumer){
            res.status(404).send({message: "email or password incorrect!"});
            return;
        }
        //console.log(costumer)
        const token = await authService.generateToken({
            id: costumer._id,
            email: costumer.email,
            name: costumer.name,
            roles: costumer.roles
        })

        res.status(201).send({
            token: token,
            data: {
                email: costumer.email,
                name: costumer.name
            }
        });
    }
    catch(err){
        res.status(400).send({message: "login fail!", error: err.message});
    };
};

exports.refreshToken = async (req, res, next) =>{

    try {

        const costumer = await repository.getById(req.userId);

        if(!costumer){
            res.status(404).send({message: "client not found!"});
            return;
        }
        
        const token = await authService.generateToken({
            id: costumer._id,
            email: costumer.email,
            name: costumer.name,
            roles: costumer.roles
        })

        res.status(201).send({
            token: token,
            data: {
                email: costumer.email,
                name: costumer.name
            }
        });
    }
    catch(err){
        res.status(400).send({message: "login fail!", error: err.message});
    };
};
