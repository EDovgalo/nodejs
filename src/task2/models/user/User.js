import { v4 as uuidv4 } from 'uuid';

export default class User {
    constructor(data) {
        this.id = data.id || uuidv4();
        this.login = data.login || 'default';
        this.password = data.password || 'default';
        this.age = data.age || 18;
        this.isDeleted = data.isDeleted || false;
    }
}
