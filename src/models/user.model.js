module.exports = (sequelize, DataTypes, Op) => {
    const User = sequelize.define(
        'user',
        {
            // To avoid auto increment id (add id to model, sequelize adds the id automatically)
            // user_id: {
            //     type: DataTypes.INTEGER,
            //     primaryKey: true,
            //     autoIncrement: true
            // },
            username: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: true,
                },
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
                validate: {
                    isEmail: true,
                },
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            age: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 21,
            },
            agree_terms: {
                type: DataTypes.BOOLEAN,
                defaultValue: true,
            },
        },
        {
            // Avoid pluralization in DB
            // freezeTableName: true
            // Avoid timestamps
            // timestamps: false
        }
    );

    return User;
};
