const {
    bulkCreateCountry, //
    linkCountryCapital,
    getCountryCapital,
    setCountryCapital,
    deleteCountry,
} = require('../controllers/country.controller');

const express = require('express');
const countryRoutes = express.Router();

countryRoutes.post('/bulk-create', bulkCreateCountry);
countryRoutes.post('/set-capital-country', linkCountryCapital);
countryRoutes.get('/get-capital-of-country', getCountryCapital);
countryRoutes.post('/set-capital-of-country', setCountryCapital);
countryRoutes.post('/delete-country-and-capital', deleteCountry);

module.exports = countryRoutes;
