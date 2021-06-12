import sinon from 'sinon';

import UsersService from '../services/users.service.js';
import { UsersController } from '../index.js';

const { assert } = sinon;
const stubUsersService = sinon.createStubInstance(UsersService);
const userController = new UsersController(stubUsersService);


describe('userController', () => {
    const mockResp = {
        json: sinon.spy()
    };

    const next = sinon.spy();

    const body = {
        name: 'name',
        age: 21
    };

    beforeEach(() => {
        mockResp.json.resetHistory();
        next.resetHistory();
    });

    describe('#createUser', () => {
        it('should call UserService.createUser with correctly params', () => {
            const req = {
                body
            };
            userController.createUser(req, mockResp, next);
            assert.calledWith(stubUsersService.createUser, body);
        });

        it('should send correctly result', async () => {
            const req = {
                body
            };
            stubUsersService.createUser.resolves({ name: 'saved user' });
            await userController.createUser(req, mockResp, next);
            assert.calledWith(mockResp.json, { result: { name: 'saved user' } });
        });

        it('should handle error', async () => {
            const req = {
                body
            };
            stubUsersService.createUser.rejects({ error: 'error' });
            await userController.createUser(req, mockResp, next);
            assert.calledWith(next, { error: 'error' });
        });
    });

    describe('#getUsers', () => {
        it('should call UserService.createUser with correctly params(limit = 5, loginSubstring = "")', async () => {
            const req = {
                query: {}
            };
            await userController.getUsers(req, mockResp, next);
            assert.calledWith(stubUsersService.getUsers, 5, '');
        });

        it('should call UserService.createUser with correctly params(limit = 15, loginSubstring = "test")', async () => {
            const req = {
                query: {
                    limit: 15,
                    loginSubstring: 'test'
                }
            };
            await userController.getUsers(req, mockResp, next);
            assert.calledWith(stubUsersService.getUsers, 15, 'test');
        });

        it('should send correctly result', async () => {
            const req = {
                query: {}
            };
            const users = [{
                name: 'name 1'
            }, {
                name: 'name 2'
            }];
            stubUsersService.getUsers.resolves(users);
            await userController.getUsers(req, mockResp, next);
            assert.calledWith(mockResp.json, { result: users });
        });

        it('should handle error', async () => {
            const req = {
                query: {}
            };
            stubUsersService.getUsers.rejects({ error: 'getUsersError' });
            await userController.getUsers(req, mockResp, next);
            assert.calledWith(next, { error: 'getUsersError' });
        });
    });

    describe('#updateUser', () => {
        it('should call UserService.getUserById with correctly params', () => {
            const req = {
                params: { id: 1 }
            };
            userController.getUserById(req, mockResp, next);
            assert.calledWith(stubUsersService.getUserById, 1);
        });

        it('should send correctly result', async () => {
            const req = {
                params: { id: 1 }
            };
            stubUsersService.getUserById.resolves({ name: 'user' });
            await userController.getUserById(req, mockResp, next);
            assert.calledWith(mockResp.json, { result: { name: 'user' } });
        });

        it('should handle error', async () => {
            const req = {
                params: { id: 1 }
            };
            stubUsersService.getUserById.rejects({ error: 'getUserByIdError' });
            await userController.getUserById(req, mockResp, next);
            assert.calledWith(next, { error: 'getUserByIdError' });
        });
    });

    describe('#updateUser', () => {
        it('should call UserService.updateUser with correctly params', () => {
            const req = {
                params: { id: 3 },
                body
            };
            userController.updateUser(req, mockResp, next);
            assert.calledWith(stubUsersService.updateUser, 3, body);
        });

        it('should send correctly result', async () => {
            const req = {
                params: { id: 3 },
                body
            };
            stubUsersService.updateUser.resolves({ name: 'updated user' });
            await userController.updateUser(req, mockResp, next);
            assert.calledWith(mockResp.json, { result: { name: 'updated user' } });
        });

        it('should handle error', async () => {
            const req = {
                params: { id: 3 }
            };
            stubUsersService.updateUser.rejects({ error: 'updateUserError' });
            await userController.updateUser(req, mockResp, next);
            assert.calledWith(next, { error: 'updateUserError' });
        });
    });

    describe('#deleteUser', () => {
        it('should call UserService.deleteUser with correctly params', () => {
            const req = {
                params: { id: 2 }
            };
            userController.deleteUser(req, mockResp, next);
            assert.calledWith(stubUsersService.deleteUser, 2);
        });

        it('should send correctly result', async () => {
            const req = {
                params: { id: 2 }
            };
            stubUsersService.deleteUser.resolves({ name: 'deleted user' });
            await userController.deleteUser(req, mockResp, next);
            assert.calledWith(mockResp.json, { result: { name: 'deleted user' } });
        });

        it('should handle error', async () => {
            const req = {
                params: { id: 2 }
            };
            stubUsersService.deleteUser.rejects({ error: 'deleteUserError' });
            await userController.deleteUser(req, mockResp, next);
            assert.calledWith(next, { error: 'deleteUserError' });
        });
    });
});
