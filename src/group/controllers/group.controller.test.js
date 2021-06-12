import sinon from 'sinon';

import GroupService from '../services/group.service.js';
import GroupController from './group.controller.js';

const { assert } = sinon;
const stubGroupService = sinon.createStubInstance(GroupService);
const groupController = new GroupController(stubGroupService);


describe('GroupController', () => {
    const mockResp = {
        json: sinon.spy()
    };

    const next = sinon.spy();

    const body = {
        name: 'group 1',
        permissions: ['WRITE']
    };

    beforeEach(() => {
        mockResp.json.resetHistory();
        next.resetHistory();
    });

    describe('#getGroupById', () => {
        it('should call GroupService.getGroupById with correctly params', () => {
            const req = {
                params: { id: 1 }
            };
            groupController.getGroupById(req, mockResp, next);
            assert.calledWith(stubGroupService.getGroupById, 1);
        });

        it('should send correctly result', async () => {
            const req = {
                params: { id: 1 }
            };
            const group = { id: 1 };
            stubGroupService.getGroupById.resolves(group);
            await groupController.getGroupById(req, mockResp, next);
            assert.calledWith(mockResp.json, { result: group });
        });

        it('should handle error', async () => {
            const req = {
                params: { id: 1 }
            };
            stubGroupService.getGroupById.rejects({ error: 'getGroupByIdError' });
            await groupController.getGroupById(req, mockResp, next);
            assert.calledWith(next, { error: 'getGroupByIdError' });
        });
    });

    describe('#getGroups', () => {
        it('should call GroupService.getGroups', async () => {
            const req = {};
            await groupController.getGroups(req, mockResp, next);
            assert.calledOnce(stubGroupService.getGroups);
        });

        it('should send correctly result', async () => {
            const req = {
            };
            const groups = [{ id: 1 }, { id: 2 }];
            stubGroupService.getGroups.resolves(groups);
            await groupController.getGroups(req, mockResp, next);
            assert.calledWith(mockResp.json, { result: groups });
        });

        it('should handle error', async () => {
            const req = {
                query: {}
            };
            stubGroupService.getGroups.rejects({ error: 'getGroupsError' });
            await groupController.getGroups(req, mockResp, next);
            assert.calledWith(next, { error: 'getGroupsError' });
        });
    });


    describe('#deleteGroup', () => {
        it('should call GroupController.deleteGroup with correctly params', () => {
            const req = {
                params: { id: 2 }
            };
            groupController.deleteGroup(req, mockResp, next);
            assert.calledWith(stubGroupService.deleteGroup, 2);
        });

        it('should send correctly result', async () => {
            const req = {
                params: { id: 2 }
            };
            stubGroupService.deleteGroup.resolves({ name: 'deleted group' });
            await groupController.deleteGroup(req, mockResp, next);
            assert.calledWith(mockResp.json, { result: { name: 'deleted group' } });
        });

        it('should handle error', async () => {
            const req = {
                params: { id: 2 }
            };
            stubGroupService.deleteGroup.rejects({ error: 'deleteGroupError' });
            await groupController.deleteGroup(req, mockResp, next);
            assert.calledWith(next, { error: 'deleteGroupError' });
        });
    });


    describe('#updateGroup', () => {
        it('should call GroupController.updateGroup with correctly params', () => {
            const req = {
                params: { id: 3 },
                body
            };
            groupController.updateGroup(req, mockResp, next);
            assert.calledWith(stubGroupService.updateGroup, 3, body);
        });

        it('should send correctly result', async () => {
            const req = {
                params: { id: 3 }
            };
            stubGroupService.updateGroup.resolves({ name: 'updated group' });
            await groupController.updateGroup(req, mockResp, next);
            assert.calledWith(mockResp.json, { result: { name: 'updated group' } });
        });

        it('should handle error', async () => {
            const req = {
                params: { id: 2 }
            };
            stubGroupService.updateGroup.rejects({ error: 'updateGroupError' });
            await groupController.updateGroup(req, mockResp, next);
            assert.calledWith(next, { error: 'updateGroupError' });
        });
    });
});
