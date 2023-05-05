'use strict'

const mongoose = require('mongoose');
const Product = mongoose.model('Product');
const ValidationContrac = require('../validators/fluent-validator');
const repository = require('../repositories/productRep')

exports.get = (req, res, next) =>{
    repository.get()
    .then(data =>{
        res.status(200).send(data);
    })
    .catch(e =>{
        res.status(400).send({message: "find fail!", data: e});
    });
};

exports.getBySlug = (req, res, next) =>{
    repository.getBySlug(req.params.slug)
    .then(data =>{
        res.status(200).send(data);
    })
    .catch(e =>{
        res.status(400).send({message: "find fail!", data: e});
    });
};

exports.getByTag = (req, res, next) =>{
    repository.getByTag(req.params.tag)
    .then(data =>{
        res.status(200).send(data);
    })
    .catch(e =>{
        res.status(400).send({message: "find fail!", data: e});
    });
};

exports.getById = (req, res, next) =>{
    repository.getById(req.params.id)
    .then(data =>{
        res.status(200).send(data);
    })
    .catch(e =>{
        res.status(400).send({message: "find fail!", data: e});
    });
};

exports.post = (req, res, next) =>{
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

    repository.create(req.body)
    .then(x =>{
        res.status(201).send({message: "create sucessfull!"});
    })
    .catch(e =>{
        res.status(400).send({message: "create fail!", data: e});
    });
};

exports.put = (req, res, next) =>{
    repository.update(req.params.id,req.body)
    .then( x =>{
        res.status(200).send({message: "update sucessfull!"});
    })
    .catch( e =>{
        res.status(400).send({message:"upadte fail",data: e});
    })
};

exports.delete = (req, res, next) =>{
    repository.delete(req.params.id)
    .then( x =>{
        res.status(200).send({message: "delete sucessfull!"});
    })
    .catch( e =>{
        res.status(400).send({message:"delete fail",data: e});
    })
};
