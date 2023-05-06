'use strict'

const express = require('express');
const router = express.Router();
const controller = require('../controllers/productCtrl');
const authService = require("../services/authServ");

router.get('/', controller.get);

router.get('/:slug', controller.getBySlug);

router.get('/admin/:id', controller.getById);

router.get('/tags/:tag', controller.getByTag);

router.post('/',authService.authorize, controller.post);

router.put('/:id',authService.authorize, controller.put)

router.delete('/:id',authService.authorize, controller.delete)

module.exports = router;