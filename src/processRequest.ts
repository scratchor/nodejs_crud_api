import http from 'http';
import { validate as uuidValidate, version as uuidVersion } from 'uuid';
import { routerWithoutUuid, routerWithUuid } from './routers.js';

export const processRequest = async (req: http.IncomingMessage, res: http.ServerResponse): Promise<void> => {
  const { method = '', url }: { method?: string | undefined, url?: string | undefined } = req;
  console.log('here ', url?.split(/(\/api\/users)(?:\/)?/g));
  const userUuid: string = url?.split(/(\/api\/users)(?:\/)?/g).pop() ?? '';
  console.log('userUuid ', userUuid);
  console.log('method ', method);

  if (userUuid) {
    if (uuidValidate(userUuid) && uuidVersion(userUuid) === 4) {
      if (routerWithoutUuid[method]) {
        await routerWithUuid[method](req, res, userUuid);
      } else {
        res.writeHead(405, { 'Content-Type': 'text/plain' });
        res.end(JSON.stringify({ message: 'Method not found!' }));
      }
    } else {
      res.writeHead(400, { 'Content-Type': 'text/plain' });
      res.end(JSON.stringify({ message: 'User\'s uuid is invalid! Please check it carefully!' }));
    }
  } else if (routerWithoutUuid[method]) {
    await routerWithoutUuid[method](req, res);
  } else {
    res.writeHead(405, { 'Content-Type': 'text/plain' });
    res.end(JSON.stringify({ message: 'Method not found!' }));
  }
};
