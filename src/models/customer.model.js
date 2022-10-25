module.exports = (sequelize, DataTypes) => {
    const Customer = sequelize.define(
        'customer',
        {
            customer_name: {
                type: DataTypes.STRING,
            },
        },
        {
            timestamps: false,
        }
    );

    return Customer;
};
