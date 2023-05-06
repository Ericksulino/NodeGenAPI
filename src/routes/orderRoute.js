'use strict'

const express = require('express');
const router = express.Router();
const controller = require('../controllers/orderCtrl');
const authService = require("../services/authServ");

router.get('/', controller.get);
router.post('/', authService.authorize,controller.post);

module.exports = router;