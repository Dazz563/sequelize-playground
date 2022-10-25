const {
    addAllProductsToCustomer, //
    addLaptopToAllCustomers,
} = require('../controllers/customer.controller');

const express = require('express');
const customerRoutes = express.Router();

customerRoutes.post('/add-all-products-to-customer', addAllProductsToCustomer);
customerRoutes.post('/add-laptop-to-all-customers', addLaptopToAllCustomers);

module.exports = customerRoutes;
