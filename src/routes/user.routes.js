const {
    getUsers, //
    getSerializedUsers,
    getUsersTotalAge,
    getUsersAged65,
    getUsersLimit,
    getUsersOrderBy,
    getUsersAgeSummedGroupByName,
    getUsersNamedEricOrAge36,
    getUsersAgeGreater39,
    getUsersAgeLessThan39OrEqualTo39,
    getUsersCharLengthName13,
    updateUsernameWhereEmail,
    updateUsernameWhereAgeIs12,
    deleteUserByName,
    deleteAllUsers,
} = require('../controllers/user.controller');

const express = require('express');
const userRoutes = express.Router();

userRoutes.get('/users', getUsers);
userRoutes.get('/serialized-users', getSerializedUsers);
userRoutes.get('/aged-users', getUsersTotalAge);
userRoutes.get('/aged-65', getUsersAged65);
userRoutes.get('/limit-2', getUsersLimit);
userRoutes.get('/ordered-by', getUsersOrderBy);
userRoutes.get('/grouped-by', getUsersAgeSummedGroupByName);
userRoutes.get('/or-operator', getUsersNamedEricOrAge36);
userRoutes.get('/greater-39', getUsersAgeGreater39);
userRoutes.get('/lessthan-equal', getUsersAgeLessThan39OrEqualTo39);
userRoutes.get('/char-13', getUsersCharLengthName13);
userRoutes.get('/update-username', updateUsernameWhereEmail);
userRoutes.get('/update-username-where-age', updateUsernameWhereAgeIs12);
userRoutes.get('/delete-by-name', deleteUserByName);
userRoutes.get('/delete-all-users', deleteAllUsers);

module.exports = userRoutes;
