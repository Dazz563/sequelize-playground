const bcrypt = require('bcrypt');
const {get} = require('http');
const zlib = require('zlib');

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
                get() {
                    const rawValue = this.getDataValue('username');
                    return rawValue.toUpperCase();
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
                set(value) {
                    // getters and setters can't use async functions we need sync functions
                    const salt = bcrypt.genSaltSync(12);
                    const hash = bcrypt.hashSync(value, salt);
                    this.setDataValue('password', hash);
                },
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
            // description: {
            //     type: DataTypes.STRING,
            //     set(value) {
            //         const compressed = zlib.deflateSync(value).toString('base64');
            //         this.setDataValue('description', compressed);
            //     },
            //     get() {
            //         const value = this.getDataValue('description');
            //         const uncompressed = zlib.inflateSync(Buffer.from(value, 'base64'));
            //         return uncompressed.toString();
            //     }
            // },
            // Virtual fields combine data but are not permanent in the db
            // aboutUser: {
            //     type: DataTypes.VIRTUAL,
            //     get() {
            //         return `${this.username} ${this.description}`;
            //     },
            // },
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
