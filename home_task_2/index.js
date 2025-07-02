import http from 'node:http';
import { scan, dispatch } from './lib/router.js';

await scan();
const server = http.createServer(dispatch);

const PORT = 3001;
server.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`);
});
