import BaseError from '../../errors/BaseError.js';


export default class GroupService {
    constructor(groupModel) {
        this.groupModel = groupModel;
    }

    async getGroupById(id) {
        return this.groupModel.findByPk(id);
    }

    async getGroups() {
        return this.groupModel.findAll();
    }

    async createGroup(data) {
        return this.groupModel.create(data);
    }

    async deleteGroup(id) {
        const result = await this.getGroupById(id);
        if (result) {
            result.destroy();
            return result;
        }
        throw new BaseError(400, 'Group not found');
    }

    async updateGroup(id, data) {
        return this.groupModel.update(data, {
            where: {
                id
            }
        });
    }
}
