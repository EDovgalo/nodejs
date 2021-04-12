export default class BaseError extends Error {
    constructor(httpCode, message) {
        super(message);
        this.httpCode = httpCode;
    }
}
