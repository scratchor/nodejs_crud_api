import http from 'http';
import getAllUsers from './controllers/getAllUsers.js';
import createUser from './controllers/createUser.js';
import getUser from './controllers/getUser.js';

interface IRouter {
  [method: string]: (req: http.IncomingMessage, res: http.ServerResponse, userUuid?: string) => Promise<void>;
}

export const routerWithoutUuid: IRouter = {
  GET: async (req, res) => getAllUsers(req, res),
  POST: async (req, res) => createUser(req, res),
};

export const routerWithUuid: IRouter = {
  GET: async (req, res) => getUser(req, res),
};
