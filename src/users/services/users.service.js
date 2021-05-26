import Sequelize from 'sequelize';
import BaseError from '../../errors/BaseError.js';

const { Op } = Sequelize;

export default class UsersService {
    constructor(usersModel) {
        this.usersModel = usersModel;
    }

    async createUser(data) {
        try {
            return await this.usersModel.create(data);
        } catch (error) {
            throw new BaseError(400, (error.original && error.original.detail) || error);
        }
    }

    async deleteUser(id) {
        return this.usersModel.update({ isDeleted: true }, {
            where: {
                id
            }
        });
    }

    async updateUser(id, data) {
        return this.usersModel.update(data, {
            where: {
                id
            }
        });
    }

    async getUsers(limit = 5, loginSubstring = '') {
        return this.usersModel.findAll({
            limit,
            where: {
                login: {
                    [Op.like]: `%${loginSubstring}%`
                }
            }
        });
    }

    async getUserById(id) {
        try {
            return this.usersModel.findByPk(id);
        } catch (err) {
            throw new BaseError(400, 'user not found');
        }
    }
}
