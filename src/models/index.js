const dbConfig = require('../../config/dbConfig');

const {Sequelize, DataTypes, Op} = require('sequelize');

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.DIALECT,
    // logging: false,
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
        await db.sequelize.sync();
        // db.sequelize.sync({alter: true});
        // db.sequelize.sync({force: true});

        // DROPPING TABLES
        // await db.users.drop();
        // DROPPING ALL TABLES
        // await db.sequelize.drop();

        
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
