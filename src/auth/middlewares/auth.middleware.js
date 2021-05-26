import { AuthService } from '../index.js';

export default async function (req, resp, next) {
    const token = req.header('Authorization');
    try {
        await AuthService.checkToken(token);
        next();
    } catch (e) {
        next(e);
    }
}
