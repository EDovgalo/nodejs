export default function executionTimeLogger(req, resp, next) {
    const start = new Date();
    resp.on('finish', () => {
        const end = new Date();
        console.log('execution time: ', end - start);
    });
    next();
}
