const dbConfig = require('../../config/dbConfig');

const {Sequelize, DataTypes, Op} = require('sequelize');

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.DIALECT,
    logging: false,
});

(async () => {
    try {
        await sequelize.authenticate();
        console.log('connected to DB');
    } catch (error) {
        console.log('error connecting to DB', error);
    }
})();

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// MODELS
db.users = require('./user.model.js')(sequelize, DataTypes, Op);
// db.products = require('./product.model.js')(sequelize, DataTypes, Op);
// db.reviews = require('./review.model.js')(sequelize, DataTypes, Op);

(async () => {
    try {
        // await db.sequelize.sync();
        await db.sequelize.sync({alter: true});
        // db.sequelize.sync({force: true});

        // --------------------------MODEL INSTANCES --------------------------

        // 1. DROPPING TABLES
        // await db.users.drop();
        // DROPPING ALL TABLES
        // await db.sequelize.drop();

        // 2. INSERTING DATA INTO TABLES
        // (build makes the object first, we can run code against the object before saving if required!)
        // const user = await db.users.build({
        //     username: 'Mark',
        //     email: 'test1@gmail.com',
        //     password: '1234',
        //     age: 39,
        //     agree_terms: true,
        // });
        // console.log(user.toJSON());
        // user.save();
        // ------------------------------------------------------
        // (create will build AND save the object to the DB)
        // const user = await db.users.create({
        //     username: 'Eric',
        //     email: 'test2@gmail.com',
        //     password: '1234',
        //     age: 65,
        //     agree_terms: true,
        // });
        // console.log(user.toJSON());
        // ------------------------------------------------------
        // (we can update the returned object inserted with save() as a shorthand)
        // const user = await db.users.create({
        //     username: 'Vern',
        //     email: 'test4@gmail.com',
        //     password: '1234',
        //     age: 30,
        //     agree_terms: true,
        // });
        // user.username = 'Jolly green giant';
        // await user.save();
        // console.log(user.toJSON());
        // ------------------------------------------------------
        // (we can destroy the returned object inserted with save() as a shorthand)
        // const user = await db.users.create({
        //     username: 'Destroyed user',
        //     email: 'test5@gmail.com',
        //     password: '1234',
        //     age: 30,
        //     agree_terms: true,
        // });
        // await user.destroy();
        // console.log(user.toJSON());
        // ------------------------------------------------------
        // (bulk creation BYPASSES VALIDATIONS BE CAREFUL)
        // const users = await db.users.bulkCreate(
        //     [
        //         {
        //             username: 'Darren Nienaber',
        //             email: 'test@gmail.com',
        //             password: '1234',
        //             age: 36,
        //             agree_terms: true,
        //         },
        //         {
        //             username: 'Mark Nienaber',
        //             email: 'test1@gmail.com',
        //             password: '1234',
        //             age: 39,
        //             agree_terms: true,
        //         },
        //         {
        //             username: 'Eric Nienaber',
        //             email: 'test2@gmail.com',
        //             password: '1234',
        //             age: 65,
        //             agree_terms: true,
        //         },
        //         {
        //             username: 'Rowena Nienaber',
        //             email: 'test3@gmail.com',
        //             password: '1234',
        //             age: 60,
        //             agree_terms: true,
        //         },
        //     ],
        //     {
        //         validate: true,
        //     }
        // );
        // users.forEach((user) => {
        //     console.log(user.toJSON());
        // });

        console.log('sync completed');
    } catch (error) {
        console.log('error syncing', error);
    }
})();

// Relations
// 1 to Many
// db.products.hasMany(db.reviews);
// db.reviews.belongsTo(db.products);
module.exports = db;
