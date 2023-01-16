import http from 'http';
import userDataBase from '../data/users.js';

export default async (req: http.IncomingMessage, res: http.ServerResponse) => {
  try {
    const listOfUsers = userDataBase.getUsers;

    if (listOfUsers) {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(listOfUsers));
    }
  } catch (err: unknown) {
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: (err as Error).message }));
  }
};
