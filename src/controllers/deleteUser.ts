import http from 'http';
import userDataBase, { IUser } from '../data/users.js';

export default async (req: http.IncomingMessage, res: http.ServerResponse, userUuid: string) => {
  try {
    const necessaryUser = userDataBase.findUser(userUuid);
    if (necessaryUser) {
      userDataBase.deleteUser(userUuid);

      res.writeHead(204, { 'Content-Type': 'application/json' });
      res.end();
    } else {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end(JSON.stringify({ message: `Unfortunately, user with id equal to ${userUuid} not found` }));
    }
  } catch (err: unknown) {
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: (err as Error).message }));
  }
};
