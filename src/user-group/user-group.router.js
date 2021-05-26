import express from 'express';
import { UserGroupController, UserGroupService, userGroupModel } from './index.js';

const router = express.Router();

const userGroupService = new UserGroupService(userGroupModel);
const userGroupController = new UserGroupController(userGroupService);

router.post('/', userGroupController.addUsersToGroup.bind(userGroupController));

export default router;
