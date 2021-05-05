import Sequelize from 'sequelize';
import db from '../../config/db.js';
import usersModel from '../../users/models/users.model.js';
import groupModel from '../../group/models/group.model.js';

const { DataTypes } = Sequelize;

const userGroupModel = db.define('UserGroup', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    }
}, {
    timestamps: false,
    freezeTableName: false
});

usersModel.belongsToMany(groupModel, { foreignKey: 'userId', through: { model: userGroupModel, unique: false } });
groupModel.belongsToMany(usersModel, { foreignKey: 'groupId', through: { model: userGroupModel, unique: false } });

userGroupModel.sync();

export default userGroupModel;
