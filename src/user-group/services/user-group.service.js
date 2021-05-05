import db from '../../config/db.js';

export default class UserGroupService {
    constructor(userGroupModel) {
        this.userGroupModel = userGroupModel;
    }

    async addUsersToGroup(groupId, userIds = []) {
        const transaction = await db.transaction();
        try {
            const requests = userIds.map(
                (userId) => this.userGroupModel.create({ userId, groupId }, { transaction })
            );
            const result = await Promise.all(requests);
            await transaction.commit();
            return result;
        } catch (err) {
            await transaction.rollback();
            throw err;
        }
    }
}
