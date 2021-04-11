export default class UsersController {
    constructor(userService) {
        this.userService = userService;
    }

    async createUser(req, resp, next) {
        try {
            const { body } = req;
            const result = await this.userService.createUser(body);
            resp.json({ result });
        } catch (err) {
            next(err);
        }
    }

    async getUsers(req, resp, next) {
        try {
            const {
                limit = 5,
                loginSubstring = ''
            } = req.query;
            const result = await this.userService.getUsers(limit, loginSubstring);
            resp.json({ result });
        } catch (err) {
            next(err);
        }
    }

    async getUserById(req, resp, next) {
        try {
            const { id } = req.params;
            const result = await this.userService.getUserById(id);
            resp.json({ result });
        } catch (err) {
            next(err);
        }
    }

    async updateUser(req, resp, next) {
        try {
            const { id } = req.params;
            const { body } = req;
            const result = await this.userService.updateUser(id, body);
            resp.json({ result });
        } catch (err) {
            next(err);
        }
    }

    async deleteUser(req, resp, next) {
        try {
            const { id } = req.params;
            const result = await this.userService.deleteUser(id);
            resp.json({ result });
        } catch (err) {
            next(err);
        }
    }
}
