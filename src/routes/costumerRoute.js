'use strict'

const express = require('express');
const router = express.Router();
const controller = require('../controllers/costumerCtrl');

router.get('/', controller.get);

router.get('/admin/:id', controller.getById);

router.post('/', controller.post);

router.put('/:id', controller.put)

router.delete('/:id', controller.delete)

module.exports = router;