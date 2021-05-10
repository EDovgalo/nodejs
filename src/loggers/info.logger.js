export default function infoLogger(req, resp, next) {
    const {
        method, path, params, query
    } = req;
    const data = {
        method, path, params, query
    };
    console.log(JSON.stringify(data));
    next();
}
