import jwt from 'jsonwebtoken';
import { promisify } from 'util';
import BaseError from '../../errors/BaseError.js';


const { SECRET_KEY } = process.env;

export default class AuthService {
    constructor(userService) {
        this.userService = userService;
    }

    async logIn(login, password) {
        const result = await this.userService.findUserByLogin(login);
        const user = result && result.dataValues;
        if (user && user.password === password) {
            const payload = { sub: user.id };
            return jwt.sign(payload, SECRET_KEY, { expiresIn: 3600 });
        }
        throw new BaseError(403, 'Incorrect login or password');
    }


    static async checkToken(token) {
        if (token) {
            const verify = promisify(jwt.verify);
            try {
                await verify(token, SECRET_KEY);
                return true;
            } catch (err) {
                throw new BaseError(403, 'Forbidden Error');
            }
        } else {
            throw new BaseError(401, 'Unauthorized  Error');
        }
    }
}
