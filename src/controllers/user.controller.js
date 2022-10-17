const {sequelize} = require('../models');
const db = require('../models');
const User = db.users;

// --------------------------MODEL QUERYING --------------------------

// findAll() returns all records
exports.getUsers = async (req, res, next) => {
    try {
        const users = await User.findAll();

        return res.status(200).json({
            message: 'All users',
            data: users,
        });
    } catch (err) {
        console.log(err);
        next();
    }
};

// attributes will only return the filds of the record specified
// GREAT for serialization (below will return all without the password)
exports.getSerializedUsers = async (req, res, next) => {
    try {
        const users = await User.findAll({
            // attributes: ['username', 'email', 'age', 'agree_terms'],
            attributes: {
                exclude: ['password'],
            },
        });

        return res.status(201).json({
            message: 'All users with no passwords',
            data: users,
        });
    } catch (err) {
        console.log(err);
        next();
    }
};

// sql aggregate functions are possible with below
// with an alias assigned (age_plus_hundred)
exports.getUsersTotalAge = async (req, res, next) => {
    try {
        const users = await User.findAll({
            // attributes: [[sequelize.fn('AVG', sequelize.col('age')), 'age_plus_hundred']],
            attributes: [[sequelize.fn('SUM', sequelize.col('age')), 'age_plus_hundred']],
        });

        return res.status(201).json({
            message: 'All users ages summed',
            data: users,
        });
    } catch (err) {
        console.log(err);
        next();
    }
};

// where clause
// used to filter the query based off a specific condition
exports.getUsersAged65 = async (req, res, next) => {
    try {
        const users = await User.findAll({
            where: {
                age: 65,
            },
        });
        // ----------------------------------------
        // if we just want specific details based off the where clause
        // const users = await User.findAll({
        //     attributes: ['username'],
        //     where: {
        //         age: 65,
        //     },
        // });
        // ----------------------------------------
        // if we just want specific details based off the where clause
        // const users = await User.findAll({
        //     attributes: ['username'],
        //     where: {
        //         age: 65,
        //     },
        // });
        // ----------------------------------------
        // multiple where clauses
        // const users = await User.findAll({
        //     where: {
        //         age: 65,
        //         username: 'Eric Nienaber',
        //     },
        // });

        return res.status(201).json({
            message: 'All users aged 65',
            data: users,
        });
    } catch (err) {
        console.log(err);
        next();
    }
};

// limit() limit amount of records returned
exports.getUsersLimit = async (req, res, next) => {
    try {
        const users = await User.findAll({
            limit: 2,
        });

        return res.status(200).json({
            message: 'All users limit 2',
            data: users,
        });
    } catch (err) {
        console.log(err);
        next();
    }
};
