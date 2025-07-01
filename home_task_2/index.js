import http from 'node:http';
// import router from './lib/router';
// const { handle } = require("./services/user.service");
import { scan } from './lib/router.js';

await scan();
const server = http.createServer((req, res) => {
  // handle(req, res);
  console.log(req,res);
  const [, page, id] = req.url.split('/');

 
});

const PORT = 3001;
server.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`);
});
