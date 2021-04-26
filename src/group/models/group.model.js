import Sequelize from 'sequelize';

import db from '../../config/db.js';

const { DataTypes } = Sequelize;

const PERMISSIONS = ['READ', 'WRITE', 'DELETE', 'SHARE', 'UPLOAD_FILES'];

const groupModel = db.define('Group', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: {
            msg: 'Name should be unique'
        }
    },
    permissions: {
        type: DataTypes.ENUM(PERMISSIONS),
        allowNull: false
    }
}, {
    timestamps: false,
    freezeTableName: true
});

groupModel.sync();

export default groupModel;
