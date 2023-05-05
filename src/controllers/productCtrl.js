'use strict'
const mongoose = require('mongoose');
const Product = mongoose.model('Product');

exports.get = (req, res, next) =>{
    Product.find({ active: true}, "title price slug")
    .then(data =>{
        res.status(200).send(data);
    })
    .catch(e =>{
        res.status(400).send({message: "find fail!", data: e});
    });
};

exports.getBySlug = (req, res, next) =>{
    Product.findOne({ slug: req.params.slug, active: true}, "title price description slug tags")
    .then(data =>{
        res.status(200).send(data);
    })
    .catch(e =>{
        res.status(400).send({message: "find fail!", data: e});
    });
};

exports.post = (req, res, next) =>{
    var product = new Product(req.body)
    product.save()
    .then(x =>{
        res.status(201).send({message: "create sucessful!"});
    })
    .catch(e =>{
        res.status(400).send({message: "create fail!", data: e});
    });
};

exports.put = (req, res, next) =>{
    const id = req.params.id;
    res.status(201).send({
        id: id,
        item: req.body});
};

exports.delete = (req, res, next) =>{
    res.status(200).send(req.body);
};
