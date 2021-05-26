import express from 'express';
import fs from 'fs';
import cors from 'cors';

import groupRouter from './group/index.js';
import userRouter from './users/user.router.js';
import userGroupRouter from './user-group/user-group.router.js';
import authRouter from './auth/auth.router.js';

import { errorHandler, joiErrorHandler } from './errors/handlers/index.js';
import db from './config/db.js';
import infoLogger from './loggers/info.logger.js';
import errorLogger from './loggers/error.logger.js';
import executionTimeLogger from './loggers/execution-time.logger.js';
import authMiddleware from './auth/middlewares/auth.middleware.js';
import allowOriginMiddleware from './cors/allow-origin.middleware.js';

function prepareDB(dbORM, pathToSql) {
    const usersSql = fs.readFileSync(pathToSql, 'utf-8');
    return dbORM.query(usersSql);
}

process.on('uncaughtException', (err) => {
    errorLogger(err);
});

process.on('unhandledRejection', (err) => {
    errorLogger(err);
});

const corsAllowList = ['localhost'];

prepareDB(db, './src/sql-scripts/create-users.sql')
    .then(() => {
        const app = express();
        const port = 3000;

        app.use(express.json());
        app.use(executionTimeLogger);
        app.use(infoLogger);
        app.use(cors(allowOriginMiddleware(corsAllowList)));

        app.use('/api/auth', authRouter);
        app.use(authMiddleware);
        app.use('/api/user', userRouter);
        app.use('/api/group', groupRouter);
        app.use('/api/user_group', userGroupRouter);

        app.use(joiErrorHandler);
        app.use(errorHandler);

        app.listen(port, () => console.log(`App running on port ${port}`));
    });
