import http from 'http';
import { v4 as uuidv4 } from 'uuid';
import userDataBase, { IUser } from '../data/users.js';

class User implements IUser {
  id: string;

  age: number;

  hobbies: string[] | [];

  username: string;

  constructor(username: string, age: number, hobbies: string[] | [], id: string) {
    this.id = id;
    this.age = age;
    this.hobbies = hobbies;
    this.username = username;
  }
}

export default async (req: http.IncomingMessage, res: http.ServerResponse) => {
  try {
    const buffers: Buffer[] = [];

    for await (const chunk of req) {
      buffers.push(chunk);
    }

    const { age, username, hobbies }: IUser = JSON.parse(
      Buffer
        .concat(buffers)
        .toString(),
    );

    if (age && username && hobbies) {
      const user = new User(username, age, hobbies, uuidv4());

      userDataBase.addUser(user);
      res.writeHead(201, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(user));
    } else {
      res.writeHead(400, { 'Content-Type': 'text/plain' });
      res.end('Please check all necessary fields was filled in: age, username, hobbies');
    }
  } catch (err: unknown) {
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: (err as Error).message }));
  }
};
