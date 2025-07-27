import http from 'http';
import fs from 'fs/promises';
import url from 'url';
import path from 'path';

const PORT = process.env.PORT;

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log(__dirname,__filename);

const server = http.createServer(async(req, res) => {
  
  try {
    if (req.method == "GET") {

      let filePath;
      if (req.url === "/") {
        filePath= path.join(__dirname,'public', 'index.html');
        // res.writeHead(200, { 'Content-Type': 'text/html' });
        // res.end('<h1>Homepage</h1>')
      } else if (req.url === '/about') {
        filePath = path.join(__dirname, 'public','about.html');
        // res.writeHead(200, { 'Content-Type': 'text/html' });
        // res.end('<h1>About</h1>');
      } else {
        // res.writeHead(404, { 'Content-Type': "text/html" });
        // res.end('<h1>Not Found</h1>');
        throw new Error('Not found')
      }
      
      const data = await fs.readFile(filePath);
      res.setHeader('Content-Type','text/html');
      res.write(data);
      res.end();
    } else {
      throw new Error('Method not allowed')
    }

  } catch (error) {
    res.writeHead(500, { 'Content-Type': "text/plain" });
    res.end('Server error');

  }
  // res.setHeader('Content-Type', 'text/plain');

  // res.statusCode = 404;
  // res.write('Hello word!');

});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT} http://localhost:8080`)
})