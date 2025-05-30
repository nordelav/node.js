const http = require("http");
const { handle } = require("./layers/controller");

const server = http.createServer((req, res) => {
  handle(req, res);
});

const PORT = 3001;
server.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`);
});
