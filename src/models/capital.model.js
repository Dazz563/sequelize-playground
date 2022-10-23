module.exports = (sequelize, DataTypes) => {
    const Capital = sequelize.define(
        'capital',
        {
            capital_name: {
                type: DataTypes.STRING,
                unique: true,
            },
        },
        {
            timestamps: false,
        }
    );

    return Capital;
};
