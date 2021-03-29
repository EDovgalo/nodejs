import express from 'express';
import * as ExpressJoiValidation from 'express-joi-validation';
import { userSchema } from './models/user/index.js';
import UsersService from './services/UsersService.js';
import UsersController from './controllers/UsersController.js';
import { baseErrorHandler } from '../errors/handlers/index.js';

const validator = ExpressJoiValidation.createValidator({
    passError: true
});
const router = express.Router();
const usersService = new UsersService();
const usersController = new UsersController(usersService);
router.use(baseErrorHandler);

router.get('/users', usersController.getUsers.bind(usersController));

router.get('/users/:id', usersController.getUserById.bind(usersController));

router.post('/users', validator.body(userSchema), usersController.createUser.bind(usersController));

router.patch('/users/:id', validator.body(userSchema), usersController.updateUser.bind(usersController));

router.delete('/users/:id', usersController.deleteUser.bind(usersController));


export default router;