import { v4 as uuidv4 } from 'uuid';

export default class User {
    constructor(data) {
        this.id = data.id || uuidv4();
        this.login = data.login;
        this.password = data.password;
        this.age = data.age;
        this.isDeleted = data.isDeleted || false;
    }
}
