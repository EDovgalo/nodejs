import Sequelize from 'sequelize';
import db from '../../config/db.js';

const { DataTypes } = Sequelize;

const usersModel = db.define('Users', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    login: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    age: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    isDeleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
}, {
    timestamps: false,
    freezeTableName: true
});

export default usersModel;
