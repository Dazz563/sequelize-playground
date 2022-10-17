const {
    getUsers, //
    getSerializedUsers,
    getUsersTotalAge,
    getUsersAged65,
    getUsersLimit,
} = require('../controllers/user.controller');

const express = require('express');
const userRoutes = express.Router();

userRoutes.get('/users', getUsers);
userRoutes.get('/serialized-users', getSerializedUsers);
userRoutes.get('/aged-users', getUsersTotalAge);
userRoutes.get('/aged-65', getUsersAged65);
userRoutes.get('/limit-2', getUsersLimit);

module.exports = userRoutes;
