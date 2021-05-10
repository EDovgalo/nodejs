import errorLogger from '../../loggers/error.logger.js';

export default (error, req, resp, next) => {
    const { message } = error;
    const {
        method, path, params, query
    } = req;
    errorLogger(error, {
        method,
        path,
        params,
        query
    });
    resp.status(error.httpCode || 500).send({ error: message || 'Internal Server Error' });
};
