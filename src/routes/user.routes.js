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
    getMaxAge,
    getMinAge,
    getSumAge,
    getUserById,
    getUserByCondition,
    findUserOrCreate,
    findAndCountAll,
    forceDelete,
    restoreDelete,
    getAllUsersIncludingSoftDeleted,
} = require('../controllers/user.controller');

const express = require('express');
const userRoutes = express.Router();

// --------------------------MODEL QUERYING ROUTES --------------------------
userRoutes.get('/users', getUsers);
userRoutes.get('/serialized-users', getSerializedUsers);
userRoutes.get('/aged-users', getUsersTotalAge);
userRoutes.get('/aged-65', getUsersAged65);
userRoutes.get('/limit-2', getUsersLimit);
userRoutes.get('/ordered-by', getUsersOrderBy);
userRoutes.get('/grouped-by', getUsersAgeSummedGroupByName);

// --------------------------MORE FINDER METHOD ROUTES ----------------------
userRoutes.get('/user/:id', getUserById);
userRoutes.get('/get-user-by-condition', getUserByCondition);
// BELOW route won't work allowNull: true
userRoutes.get('/find-or-create', findUserOrCreate);
userRoutes.get('/find-and-count', findAndCountAll);

userRoutes.get('/or-operator', getUsersNamedEricOrAge36);
userRoutes.get('/greater-39', getUsersAgeGreater39);
userRoutes.get('/lessthan-equal', getUsersAgeLessThan39OrEqualTo39);
userRoutes.get('/char-13', getUsersCharLengthName13);
userRoutes.get('/update-username', updateUsernameWhereEmail);
userRoutes.get('/update-username-where-age', updateUsernameWhereAgeIs12);
userRoutes.get('/delete-by-name', deleteUserByName);
userRoutes.get('/delete-all-users', deleteAllUsers);
// --------------------------UTILITY FUNCTIONS ROUTES -----------------------
userRoutes.get('/max-age', getMaxAge);
userRoutes.get('/min-age', getMinAge);
userRoutes.get('/sum-age', getSumAge);
// -------------------------- PARANOID TABLES -----------------------
userRoutes.get('/force-delete-by-name', forceDelete);
userRoutes.get('/restore-delete-by-name', restoreDelete);
userRoutes.get('/users-including-soft-deleted', getAllUsersIncludingSoftDeleted);

module.exports = userRoutes;
