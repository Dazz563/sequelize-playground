module.exports = (sequelize, DataTypes) => {
    const CustomerProduct = sequelize.define(
        'customer_product',
        {
            customerproductId: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
        },
        {
            timestamps: false,
        }
    );

    return CustomerProduct;
};
