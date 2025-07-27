import { createServer } from 'http';
import { parse } from 'path';

const PORT = process.env.PORT;

const logger = (req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
}

const jsonMiddleware = (req, res, next) => {
  res.setHeader('Content-Type', 'application/json');
  next();
}

const getUserHandler = (req, res) => {
  res.statusCode = 201;
  res.write(JSON.stringify(users));
  res.end();

}

const notFoundHandler = (req, res) => {
  res.statusCode = 404;
  res.write(JSON.stringify({ message: "User not found" }));
  res.end();
}

const addUserHandler = (req, res) => {
  let body= '';
  req.on('data',(chunk)=>{
    body+=chunk.toString();
    
  });
  req.on('end',()=>{
    const newUser = JSON.parse(body);
    users.push(newUser);
    res.statusCode = 201;
    res.write(JSON.stringify(newUser));
    // res.write(JSON.stringify(users));
    res.end();
  })
}

const getUserByIdHandler = (req, res) => {
  res.statusCode = 201;
  const id = req.url.split('/')[3];
  const user = users.find((user) => user.id === parseInt(id));
  if (!user) {

    notFoundHandler(req, res)

  }
  console.log(id);
  res.write(JSON.stringify(user));
  res.end();



}
const users = [
  {
    id: 1, name: "John Doe"
  },

  {
    id: 2, name: "John Doe"
  },

  {
    id: 3, name: "John Doe"
  }


]

const server = createServer((req, res) => {
  logger(req, res, () => {

    jsonMiddleware(req, res, () => {
      if (req.url === '/api/users' && req.method === "GET") {

        getUserHandler(req, res);

      } else if (req.url.match(/\/api\/users\/([0-9]+)/) && req.method === 'GET') {
        getUserByIdHandler(req, res);
      }
      
      else if(req.url=='/api/users'&& req.method==='POST'){
        addUserHandler(req,res);
      }
      else {
        notFoundHandler(req, res);
      }
    });
  });
}
)

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT} http://localhost:8080`)
})