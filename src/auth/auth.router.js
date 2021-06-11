import express from 'express';

import { UsersService, usersModel } from '../users/index.js';
import { AuthService, AuthController } from './index.js';

const userService = new UsersService(usersModel);

const authService = new AuthService(userService);
const authController = new AuthController(authService);

const router = express.Router();

router.post('/login', authController.logIn.bind(authController));

export default router;
