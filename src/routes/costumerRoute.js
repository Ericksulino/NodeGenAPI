'use strict'

const express = require('express');
const router = express.Router();
const controller = require('../controllers/costumerCtrl');
const authService = require("../services/authServ");

router.get('/', controller.get);

router.get('/admin/:id',authService.authorize, controller.getById);

router.post('/', controller.post);

router.put('/:id',authService.authorize, controller.put);

router.delete('/:id',authService.authorize, controller.delete);

router.post('/auth', controller.authenticate);

module.exports = router;