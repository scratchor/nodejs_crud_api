import http from 'http';
import dotenv from 'dotenv';
import { processRequest } from './processRequest.js';
import uncaughtError from './uncaughtError.js';

dotenv.config();
uncaughtError();

const generalUrl = '/api/users';
const PORT = process.env.PORT || 5000;
console.log(process.env.NODE_ENV);
const server = http.createServer(async (req: http.IncomingMessage, res: http.ServerResponse): Promise<void> => {
  console.log(req.url && req.url.startsWith(generalUrl));
  if (req.url && req.url.startsWith(generalUrl)) {
    await processRequest(req, res);
  }

  // if (req.url === '/api' && req.method === 'GET') {
  //   // response headers
  //   res.writeHead(200, { 'Content-Type': 'application/json' });
  //   // set the response
  //   res.write('Hi there, This is a Vanilla Node.js API');
  //   // end the response
  //   res.end();
  // }

  // If no route present
  else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Page not found' }));
  }
});

server.listen(PORT, () => {
  console.log(`server started on port: ${PORT}`);
});
