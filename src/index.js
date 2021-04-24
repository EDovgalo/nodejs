import express from 'express';
import fs from 'fs';
import userRouter from './users/index.js';
import { errorHandler, joiErrorHandler } from './errors/handlers/index.js';
import db from './config/db.js';

function prepareDB(dbORM, pathToSql) {
    const usersSql = fs.readFileSync(pathToSql, 'utf-8');
    return dbORM.query(usersSql);
}

prepareDB(db, './src/sql-scripts/create-users.sql')
    .then(() => {
        const app = express();
        const port = 3000;

        app.use(express.json());

        app.use('/api/user', userRouter);

        app.use(joiErrorHandler);
        app.use(errorHandler);

        app.listen(port, () => console.log(`App running on port ${port}`));
    })
    .catch((err) => console.error(err));
