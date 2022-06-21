import http from 'http';
import userDataBase, { IUser } from '../data/users.js';

export default async (req: http.IncomingMessage, res: http.ServerResponse, userUuid: string) => {
  try {
    let body: string | Buffer[] = [];

    req.on('error', (err) => {
      throw new Error(err.message);
    }).on('data', (chunk) => {
      (body as Buffer[]).push(chunk);
    }).on('end', () => {
      body = Buffer.concat(body as Buffer[]).toString();

      const { age, username, hobbies }: IUser = JSON.parse(body);

      const userIndex = userDataBase.findUserIndex(userUuid);

      if (userIndex !== -1) {
        const oldUser = userDataBase.getUserByIndex(userIndex);
        const newUser = {
          ...oldUser,
          age: age || oldUser.age,
          hobbies: hobbies || oldUser.hobbies,
          username: username || oldUser.username,
        };

        userDataBase.updateUser(userIndex, newUser);

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(newUser));
      } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end(`Unfortunately, user with id equal to ${userUuid} not found`);
      }
    });
  } catch (err: unknown) {
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: (err as Error).message }));
  }
};
