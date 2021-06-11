export default function (allowList = []) {
    return (req, cb) => {
        const origin = req.header('origin');
        const isAllowOrigin = origin ? allowList.some((i) => origin.includes(i)) : false;
        let option;
        if (isAllowOrigin) {
            option = { origin: true };
        } else {
            option = { origin: false };
        }
        cb(null, option);
    };
}
