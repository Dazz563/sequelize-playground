const {} = require('../controllers/user.controller');

const express = require('express');
const userRoutes = express.Router();

userRoutes.post('/create-review');

module.exports = userRoutes;