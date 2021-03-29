export default class UsersController {
    constructor(userService) {
        this.userService = userService;
    }

    createUser(req, resp) {
        const { body } = req;
        const result = this.userService.createUser(body);
        resp.json({ result });
    }

    getUsers(req, resp) {
        const { limit = this.userService.users.length, loginSubstring = '' } = req.query;
        const result = this.userService.getUsers(limit, loginSubstring);
        resp.json({ result });
    }

    getUserById(req, resp) {
        const { id } = req.params;
        const result = this.userService.getUserById(id);
        resp.json({ result });
    }

    updateUser(req, resp) {
        const { id } = req.params;
        const { body } = req;
        const result = this.userService.updateUser(id, body);
        resp.json({ result });
    }

    deleteUser(req, resp) {
        const { id } = req.params;
        const result = this.userService.deleteUser(id);
        resp.json({ result });
    }
}
