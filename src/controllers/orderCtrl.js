'use strict'

const repository = require('../repositories/orderRep')
const guid = require('guid');

exports.get = async (req, res, next) =>{
    try{
        const data = await repository.get();
        res.status(200).send(data);
    }
    catch (err) {
        res.status(400).send({message: "find fail!", error: err.message});
    };
};

exports.post = async (req, res, next) =>{
    
    try {
        await repository.create({

            costumer: req.body.costumer,
            number: guid.raw().substring(0,6),
            items: req.body.items
        })
        res.status(201).send({message: "create sucessfull!"});
    }
    catch(err){
        res.status(400).send({message: "create fail!", error: err.message});
    };
};

