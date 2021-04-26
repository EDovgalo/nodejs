import express from 'express';
import UserGroupService from './services/user-group.service.js';
import UserGroupController from './controllers/user-group.controller.js';
import userGroupModel from './models/user-group.model.js';


const router = express.Router();

const userGroupService = new UserGroupService(userGroupModel);
const userGroupController = new UserGroupController(userGroupService);

router.post('/', userGroupController.addUsersToGroup.bind(userGroupController));

export default router;
