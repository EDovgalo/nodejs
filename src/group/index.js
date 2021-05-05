import express from 'express';

import groupModel from './models/group.model.js';
import GroupService from './services/group.service.js';
import GroupController from './controllers/group.controller.js';

const router = express.Router();
const groupService = new GroupService(groupModel);
const groupController = new GroupController(groupService);

router.get('/', groupController.getGroups.bind(groupController));
router.get('/:id', groupController.getGroupById.bind(groupController));

router.post('/', groupController.createGroup.bind(groupController));
router.put('/:id', groupController.updateGroup.bind(groupController));
router.patch('/:id', groupController.updateGroup.bind(groupController));
router.delete('/:id', groupController.deleteGroup.bind(groupController));


export default router;
