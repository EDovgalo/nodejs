import logger from '../config/logger.js';

export default function errorLogger(error, info = {}) {
    logger.error({
        level: 'error',
        message: error.message,
        stack: error.stack,
        ...info
    });
}
