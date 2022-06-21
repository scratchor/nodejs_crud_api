import http from 'http';
import { validate as uuidValidate, version as uuidVersion } from 'uuid';
import { routerWithoutUuid, routerWithUuid } from './routers.js';

export const processRequest = async (req: http.IncomingMessage, res: http.ServerResponse): Promise<void> => {
  const { method = '', url }: { method?: string | undefined, url?: string | undefined } = req;
  const userUuid: string = url?.split(/(\/api\/users)(?:\/)?/g).pop() ?? '';

  if (userUuid) {
    if (uuidValidate(userUuid) && uuidVersion(userUuid) === 4) {
      if (routerWithUuid[method]) {
        await routerWithUuid[method](req, res, userUuid);
      } else {
        res.writeHead(405, { 'Content-Type': 'text/plain' });
        res.end('Method not found!');
      }
    } else {
      res.writeHead(400, { 'Content-Type': 'text/plain' });
      res.end(`User's id '${userUuid}' is invalid! Please check it carefully!`);
    }
  } else if (routerWithoutUuid[method]) {
    await routerWithoutUuid[method](req, res);
  } else {
    res.writeHead(405, { 'Content-Type': 'text/plain' });
    res.end('Method not found!');
  }
};
