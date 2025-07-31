import path from 'path';
import url from "url";

const filePath ='./dir1/dir2/trest.txt';

console.log(path.basename(filePath));

console.log(path.dirname(filePath));

console.log(path.extname(filePath));

console.log(path.parse(filePath));

// __filename 
// __dirname -доступні тільки у common.js

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log(__filename);
console.log(__dirname);

const filePath2 = path.join(__dirname, 'dir1', 'dir2', 'test.txt');
console.log(filePath2);
