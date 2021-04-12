export default (error, req, resp, next) => {
    const { message } = error;
    console.error(message);
    resp.status(500).send({ error: message });
};
