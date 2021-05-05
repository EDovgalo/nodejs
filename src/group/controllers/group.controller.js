export default class GroupController {
    constructor(groupService) {
        this.groupService = groupService;
    }

    async getGroupById(req, resp, next) {
        try {
            const { id } = req.params;
            const result = await this.groupService.getGroupById(id);
            resp.json({ result });
        } catch (err) {
            next(err);
        }
    }

    async getGroups(req, resp, next) {
        try {
            const result = await this.groupService.getGroups();
            resp.json({ result });
        } catch (err) {
            next(err);
        }
    }

    async createGroup(req, resp, next) {
        try {
            const { body } = req;
            const result = await this.groupService.createGroup(body);
            resp.json({ result });
        } catch (err) {
            next(err);
        }
    }

    async deleteGroup(req, resp, next) {
        try {
            const { id } = req.params;
            const result = await this.groupService.deleteGroup(id);
            resp.json({ result });
        } catch (err) {
            next(err);
        }
    }

    async updateGroup(req, resp, next) {
        try {
            const { id } = req.params;
            const { body } = req;
            const result = await this.groupService.updateGroup(id, body);
            resp.json({ result });
        } catch (err) {
            next(err);
        }
    }
}
