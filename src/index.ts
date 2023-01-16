import http from 'http';
import dotenv from 'dotenv';
import { processRequest } from './processRequest.js';
import uncaughtError from './uncaughtError.js';

dotenv.config();
uncaughtError();

const PORT = process.env.PORT || 3000;

const server = http.createServer(async (req: http.IncomingMessage, res: http.ServerResponse): Promise<void> => {
  try {
    if (req.url && req.url.startsWith(`/${process.env.GENERAL_URL}`)) {
      await processRequest(req, res);
    } else {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'Sorry, such endpoint not found' }));
    }
  } catch (err: unknown) {
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: (err as Error).message }));
  }
});

server.listen(PORT, () => {
  console.info(`server started on port: ${PORT}`);
});
