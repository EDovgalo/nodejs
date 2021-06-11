import express from 'express';
import * as ExpressJoiValidation from 'express-joi-validation';

import userValidationSchema from './validation-schemas/user-validation-schema.js';
import { UsersService, UsersController, usersModel } from './index.js';

const validator = ExpressJoiValidation.createValidator({
    passError: true
});
const router = express.Router();
const usersService = new UsersService(usersModel);
const usersController = new UsersController(usersService);

router.get('/', usersController.getUsers.bind(usersController));
router.get('/:id', usersController.getUserById.bind(usersController));

router.post('/',
    validator.body(userValidationSchema),
    usersController.createUser.bind(usersController));

router.patch('/:id',
    validator.body(userValidationSchema),
    usersController.updateUser.bind(usersController));


router.put('/:id',
    validator.body(userValidationSchema),
    usersController.updateUser.bind(usersController));

router.delete('/:id', usersController.deleteUser.bind(usersController));

export default router;
