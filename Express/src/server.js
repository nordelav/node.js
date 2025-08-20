import http from 'node:http';
import { createApp } from './app.js';
import { config } from './config/index.js';



const app = createApp();
const server = http.createServer(app);

server.listen(config.port, () => console.log(`Started at ${config.env}}. API ready on on http://localhost:${config.port}`));

function shutDown() {
  console.log('Processing grasefull shotdown');
  server.close(() => {
    console.log('Closing remaining connections ');
    process.exit(0);
  })

  setTimeout(() => process.exit(1), 10_000).unref();

  process.on('SIGTERM', shutDown);
  process.on('SIGINT', shutDown);
}
