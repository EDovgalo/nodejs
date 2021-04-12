import BaseError from '../errors/BaseError.js';

export default function userExistValidator(usersService) {
    return (req, resp, next) => {
        const { body } = req;
        const user = usersService.getUserByLogin(body.login);
        if (user) {
            throw new BaseError(400, 'user with same login exists');
        }
        next();
    };
}
