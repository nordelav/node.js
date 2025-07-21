import http from 'node:http';
import {createApp} from './app.js';
import { config } from './config/index.js';



const PORT = 3000;


const app =createApp();
const server = http.createServer(app);

server.listen(3000,()=>console.log(`Started at ${PORT}. API ready on on http://localhost:${PORT}`));


