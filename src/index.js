import express from 'express';
import userRouter from './task2/index.js';
import { baseErrorHandler, joiErrorHandler } from './errors/handlers/index.js';


const app = express();
const port = 3000;

app.use(express.json());

app.use('/api/user', userRouter);

app.use(joiErrorHandler);
app.use(baseErrorHandler);

app.listen(port, () => console.log(`App running on port ${port}`));
