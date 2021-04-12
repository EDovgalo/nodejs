export default (err, req, res, next) => {
    if (err && err.error && err.error.isJoi) {
        res.status(400)
            .json({ error: err.error.toString() });
    } else {
        next(err);
    }
};
