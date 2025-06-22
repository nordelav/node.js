
import { getToday } from "./helpers/getToday.js";
import { loadEnv } from "./helpers/loadEnv.js";
import { route } from "./router.js";
loadEnv();
const date = getToday();

console.log
route(process.argv,date);







