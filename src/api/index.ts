import express from 'express';
import { RouteHandler } from './routes';

const server = express();
server.use(express.json({ limit: '5mb' }));
RouteHandler.setup(server);
server.listen(3000, () => {
  console.log('Server started...');
});
