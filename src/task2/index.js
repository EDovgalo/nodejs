import express from 'express';
import * as ExpressJoiValidation from 'express-joi-validation';
import { userSchema } from './models/user/index.js';
import UsersService from './services/UsersService.js';
import UsersController from './controllers/UsersController.js';
import { baseErrorHandler } from '../errors/handlers/index.js';
import userExistValidator from '../validators/userExist.validator.js';

const validator = ExpressJoiValidation.createValidator({
    passError: true
});
const router = express.Router();
const usersService = new UsersService();
const usersController = new UsersController(usersService);
router.use(baseErrorHandler);

router.get('/', usersController.getUsers.bind(usersController));

router.get('/:id', usersController.getUserById.bind(usersController));

router.post('/', userExistValidator(usersService), validator.body(userSchema), usersController.createUser.bind(usersController));

router.patch('/:id', validator.body(userSchema), usersController.updateUser.bind(usersController));

router.put('/:id', validator.body(userSchema), usersController.updateUser.bind(usersController));

router.delete('/:id', usersController.deleteUser.bind(usersController));


export default router;
