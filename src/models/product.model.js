module.exports = (sequelize, DataTypes) => {
    const Product = sequelize.define(
        'product',
        {
            product_name: {
                type: DataTypes.STRING,
            },
        },
        {
            timestamps: false,
        }
    );

    return Product;
};
