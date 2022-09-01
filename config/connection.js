//import Sequelize constructor
const Sequelize = require('sequelize');

//require .env file to log in to database
require('dotenv').config();

//connection to database
const sequelize = process.env.JAWSDB_URL
? new Sequelize(process.env.JAWSDB_URL)
: new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PW, {
    host: 'localhost',
    dialect: 'mysql',
    port: 3306
});

module.exports = sequelize; 