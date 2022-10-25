const db = require('../models');
const Customer = db.customer;
const Product = db.product;

// util function to add all products to one customer - addProducts()
exports.addAllProductsToCustomer = async (req, res, next) => {
    try {
        let customerRes = await Customer.findOne({
            where: {
                customer_name: 'Darren Nienaber',
            },
        });
        let productRes = await Product.findAll();
        // Seq. utitlity function
        await customerRes.addProducts(productRes);

        return res.status(200).json({
            message: `All products added to user`,
        });
    } catch (err) {
        console.log(err);
        next();
    }
};

// util function to add a laptop to all customers - addCustomers()
exports.addLaptopToAllCustomers = async (req, res, next) => {
    try {
        let productRes = await Product.findOne({
            where: {
                product_name: 'Laptop',
            },
        });
        let customerRes = await Customer.findAll();
        // Seq. utitlity function
        await productRes.addCustomers(customerRes);

        return res.status(200).json({
            message: `Laptop added to all users`,
        });
    } catch (err) {
        console.log(err);
        next();
    }
};
