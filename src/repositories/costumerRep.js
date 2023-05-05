'use strict'

const mongoose = require('mongoose');
const Costumer = mongoose.model('Costumer');

exports.get = async () =>{
    const res = await Costumer.find({}, "name email");
    return res;
};

exports.getById = async (id) =>{
    const res = await Costumer.findById(id);
    return res;
};

exports.create = async (data) =>{
    var costumer = new Costumer(data)
    await costumer.save();
};

exports.update = async (id, data) =>{
    await Costumer
    .findByIdAndUpdate(id,{
        $set:{
            name: data.name,
            email:  data.email,
            passord:  data.passord,
        }
    });
};

exports.delete = async (id) =>{
    await Costumer.findByIdAndRemove(id);
}