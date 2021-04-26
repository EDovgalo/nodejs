export default class UserGroupController {
    constructor(userGroupService) {
        this.userGroupService = userGroupService;
    }

    async addUsersToGroup(req, resp, next) {
        try {
            const { userIds, groupId } = req.body;
            const result = await this.userGroupService.addUsersToGroup(groupId, userIds);
            resp.send({ result });
        } catch (err) {
            next(err);
        }
    }
}
