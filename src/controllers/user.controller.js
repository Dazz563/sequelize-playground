const {sequelize} = require('../models');
const db = require('../models');
const User = db.users;
const {Op} = require('sequelize');

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

// orderBy() order data
exports.getUsersOrderBy = async (req, res, next) => {
    try {
        const users = await User.findAll({
            order: [['age', 'DESC']],
            // order: [['age', 'ASC']],
        });

        return res.status(200).json({
            message: 'All users ordered',
            data: users,
        });
    } catch (err) {
        console.log(err);
        next();
    }
};

// groupBy() grouping data
// grouping allows you to group rows that have the same value into summary row
// often used with aggregate functions
exports.getUsersAgeSummedGroupByName = async (req, res, next) => {
    try {
        const users = await User.findAll({
            attributes: ['username', [sequelize.fn('SUM', sequelize.col('age')), 'sum_age']],
            group: 'username',
        });

        return res.status(200).json({
            message: 'All users grouped by name',
            data: users,
        });
    } catch (err) {
        console.log(err);
        next();
    }
};

// --------------------------QUERY OPERATORS --------------------------
// Or operator
exports.getUsersNamedEricOrAge36 = async (req, res, next) => {
    try {
        const users = await User.findAll({
            where: {
                [Op.or]: {
                    username: 'Eric Nienaber',
                    age: 36,
                },
            },
        });

        return res.status(200).json({
            message: 'All users names Eric Nienaber OR age 36',
            data: users,
        });
    } catch (err) {
        console.log(err);
        next();
    }
};

// Or.gt operator
exports.getUsersAgeGreater39 = async (req, res, next) => {
    try {
        const users = await User.findAll({
            where: {
                age: {
                    [Op.gt]: 39,
                },
            },
        });

        return res.status(200).json({
            message: 'All users age > 39',
            data: users,
        });
    } catch (err) {
        console.log(err);
        next();
    }
};

// Or.or operator
exports.getUsersAgeLessThan39OrEqualTo39 = async (req, res, next) => {
    try {
        const users = await User.findAll({
            where: {
                age: {
                    [Op.or]: {
                        [Op.lt]: 39,
                        [Op.eq]: 39,
                    },
                },
            },
        });

        return res.status(200).json({
            message: 'All users age <= 39',
            data: users,
        });
    } catch (err) {
        console.log(err);
        next();
    }
};

// sequelize.where()
exports.getUsersCharLengthName13 = async (req, res, next) => {
    try {
        const users = await User.findAll({
            where: sequelize.where(sequelize.fn('char_length', sequelize.col('username')), 13),
        });

        return res.status(200).json({
            message: 'All users with 13 username char_lengths',
            data: users,
        });
    } catch (err) {
        console.log(err);
        next();
    }
};

// updating records based on where clause
exports.updateUsernameWhereEmail = async (req, res, next) => {
    try {
        const updateResult = await User.update(
            {
                username: 'Vern Nienaber', // new data to insert
            },
            {
                where: {
                    email: 'test7@gmail.com',
                },
            }
        );

        return res.status(200).json({
            message: 'Username updated',
            data: updateResult,
        });
    } catch (err) {
        console.log(err);
        next();
    }
};

// updating records based on where clause
exports.updateUsernameWhereAgeIs12 = async (req, res, next) => {
    try {
        const updateResult = await User.update(
            {
                username: 'Little Darren Nienaber', // new data to insert
            },
            {
                where: {
                    age: {
                        [Op.eq]: 12,
                    },
                },
            }
        );

        return res.status(200).json({
            message: 'Username updated',
            data: updateResult,
        });
    } catch (err) {
        console.log(err);
        next();
    }
};

// destroying records based on where clause
exports.deleteUserByName = async (req, res, next) => {
    try {
        const destroyResult = await User.destroy({
            where: {
                username: 'Little Darren Nienaber',
            },
        });

        return res.status(200).json({
            message: 'User deleted',
            data: destroyResult,
        });
    } catch (err) {
        console.log(err);
        next();
    }
};

// destroying ALL records
exports.deleteAllUsers = async (req, res, next) => {
    try {
        const destroyResult = await User.destroy({
            truncate: true,
        });

        return res.status(200).json({
            message: 'All records deleted',
            data: destroyResult,
        });
    } catch (err) {
        console.log(err);
        next();
    }
};

// --------------------------UTILITY FUNCTIONS --------------------------
