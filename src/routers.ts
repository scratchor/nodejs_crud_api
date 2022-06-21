import http from 'http';
import getUser from './controllers/getUser.js';
import createUser from './controllers/createUser.js';
import updateUser from './controllers/updateUser.js';
import getAllUsers from './controllers/getAllUsers.js';
import deleteUser from './controllers/deleteUser.js';

interface IRouter {
  [method: string]: (req: http.IncomingMessage, res: http.ServerResponse, userUuid?: string) => Promise<void>;
}

export const routerWithoutUuid: IRouter = {
  GET: async (req, res) => getAllUsers(req, res),
  POST: async (req, res) => createUser(req, res),
};

export const routerWithUuid: IRouter = {
  GET: async (req, res, userUuid) => getUser(req, res, userUuid as string),
  PUT: async (req, res, userUuid) => updateUser(req, res, userUuid as string),
  DELETE: async (req, res, userUuid) => deleteUser(req, res, userUuid as string),
};
