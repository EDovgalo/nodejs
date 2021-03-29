import User from '../models/user/User.js';
import BaseError from '../../errors/BaseError.js';

export default class UsersService {
    constructor() {
        this.users = [];
    }

    createUser(data) {
        const user = new User(data);
        this.users.push(user);
        return user;
    }

    deleteUser(id) {
        const user = this.users.find((value) => value.id === id);
        if (user) {
            user.isDeleted = true;
            return user;
        }
        throw new BaseError(400, 'user not found');
    }

    updateUser(id, data) {
        const i = this.users.findIndex((value) => value.id === id);
        if (i !== -1) {
            this.users[i] = { ...this.users[i], ...data };
            return this.users[i];
        }
        throw new BaseError(400, 'user not found');
    }

    getUsers(limit = this.users.length, loginSubstring = '') {
        const result = [...this.users];
        return result.filter((item) => item.login.includes(loginSubstring))
            .sort((a, b) => a.login.localeCompare(b.login))
            .slice(0, limit);
    }

    getUserById(id) {
        const user = this.users.find((value) => value.id === id);
        if (user) {
            return user;
        }
        throw new BaseError(400, 'user not found');
    }
}
