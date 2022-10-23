module.exports = (sequelize, DataTypes) => {
    const Country = sequelize.define(
        'country',
        {
            country_name: {
                type: DataTypes.STRING,
                unique: true,
            },
        },
        {
            timestamps: false,
        }
    );

    return Country;
};
