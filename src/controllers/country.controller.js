// const {sequelize} = require('../models');
const db = require('../models');
const Country = db.countries;
const Capital = db.capitals;
// const {Op} = require('sequelize');

// bulk create countries
exports.bulkCreateCountry = async (req, res, next) => {
    try {
        const countries = await Country.bulkCreate([
            {
                country_name: 'Spain',
            },
            {
                country_name: 'France',
            },
            {
                country_name: 'Germany',
            },
            {
                country_name: 'England',
            },
        ]);
        const capitals = await Capital.bulkCreate([
            {
                capital_name: 'London',
            },
            {
                capital_name: 'Madrid',
            },
            {
                capital_name: 'Paris',
            },
            {
                capital_name: 'Berlin',
            },
        ]);
        // const users = await User.findAll({raw: true});

        return res.status(201).json({
            message: 'Bulk create countries and capitals',
            data: [countries, capitals],
        });
    } catch (err) {
        console.log(err);
        next();
    }
};

exports.linkCountryCapital = async (req, res, next) => {
    const country = req.query.country;
    const capital = req.query.capital;

    try {
        let countryResult = await Country.findOne({
            where: {
                country_name: country,
            },
        });
        let capitalResult = await Capital.findOne({
            where: {
                capital_name: capital,
            },
        });
        // Seq. utitlity function
        await countryResult.setCapital(capitalResult);
        return res.status(201).json({
            message: 'Capital linked with country',
        });
    } catch (err) {
        console.log(err);
        next();
    }
};

exports.getCountryCapital = async (req, res, next) => {
    const country = req.query.country;

    try {
        let countryResult = await Country.findOne({
            where: {
                country_name: country,
            },
        });
        // Seq. utitlity function
        let capitalRes = await countryResult.getCapital();
        return res.status(200).json({
            message: 'Capital linked with country',
            data: capitalRes,
        });
    } catch (err) {
        console.log(err);
        next();
    }
};

exports.setCountryCapital = async (req, res, next) => {
    try {
        let countryResult = await Country.create({
            country_name: 'USA',
        });
        // Seq. utitlity function
        let capitalCreateRes = await countryResult.createCapital({
            capital_name: 'Washington DC',
        });
        return res.status(201).json({
            message: 'Capital created and linked with country',
            data: capitalCreateRes,
        });
    } catch (err) {
        console.log(err);
        next();
    }
};

// showcases onDelete: 'CASCADE'
exports.deleteCountry = async (req, res, next) => {
    try {
        let deleteResult = await Country.destroy({
            where: {
                country_name: 'USA',
            },
        });

        return res.status(200).json({
            message: 'Country deleted with capital onDelete cascade',
            data: deleteResult,
        });
    } catch (err) {
        console.log(err);
        next();
    }
};
