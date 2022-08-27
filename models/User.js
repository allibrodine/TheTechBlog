const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

//create User model
class User extends Model {}

//table columns and configuration for User
User.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        unique: true,
        validate: {
            //make sure it's a valid e-mail address
            isEmail: true
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            //password must be at least 6 characters long
            len: [4]
        }
    }
 },
 {
     sequelize,
     timestamps: false,
     freezeTableName: true,
     underscored: true,
     modelName: 'user'
 }
);

module.exports = User;