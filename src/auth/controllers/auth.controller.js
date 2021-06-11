export default class AuthController {
    constructor(authService) {
        this.authService = authService;
    }

    async logIn(req, resp, next) {
        try {
            const { login, password } = req.body;
            const result = await this.authService.logIn(login, password);
            resp.json({ result });
        } catch (err) {
            next(err);
        }
    }
}
