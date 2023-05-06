'use strict'

const ValidationContrac = require('../validators/fluent-validator');
const repository = require('../repositories/productRep')

exports.get = async (req, res, next) =>{
    try{
        const data = await repository.get();
        res.status(200).send(data);
    }
    catch (err) {
        res.status(400).send({message: "find fail!", error: err.message});
    };
};

exports.getBySlug = async (req, res, next) =>{
    try{
        const data = await repository.getBySlug(req.params.slug)
        res.status(200).send(data);
    }
    catch(err) {
        res.status(400).send({message: "find fail!", error: err.message});
    };
};

exports.getByTag = async (req, res, next) =>{
    try{
        const data = await repository.getByTag(req.params.tag)
        res.status(200).send(data);
    }
    catch(err){
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
    contract.hasMinLen(req.body.title, 3, 'O Titulo deve conter pelo menos 3 caracteres');
    contract.hasMinLen(req.body.slug, 3, 'O Slug deve conter pelo menos 3 caracteres');
    contract.hasMinLen(req.body.descripton, 5, 'A descrição deve conter pelo menos 5 caracteres');
    contract.isDifZero(req.body.price,'O valor do produto deve ser diferente de zero!');

    //Se os dados forem invalidos
    if(!contract.isValid()){
        res.status(400).send(contract.errors()).end();
        return;
    }
    
    try {
        await repository.create(req.body)
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
