export default (error, req, resp, next) => {
    const { message } = error;
    console.error(error);
    resp.status(error.httpCode || 500).send({ error: message || 'server error' });
};
