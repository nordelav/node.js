
import { parseArgs } from './helpers/parseArgs.js';
import { getToday } from './helpers/getToday.js';
import { loadEnv } from './helpers/loadEnv.js';
import { route } from './router.js';
loadEnv();
const date = getToday();
const args= process.argv.slice(2);

 
route(parseArgs(args),date);

 






