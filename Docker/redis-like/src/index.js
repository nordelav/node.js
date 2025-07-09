import http from "node:http";

const dataStore = new Map();

const stringify = (json, res) => {
  res.end(JSON.stringify(json));
}

http.createServer((req, res) => {
  const url = new URL(req.url, "http://x");
  console.log(url);
  if (req.method == "GET" && url.pathname === "/get") {
    return stringify({ value: dataStore.get(url.searchParams.get("key")) ?? null }, res);
  }

  if (req.method == "POST" && url.pathname === "/set") {
    let body = "";
    req.on("data", chunk => (body += chunk));
    req.on("end", () => {
      const { key, value } = JSON.parse(body);
      dataStore.set(key, value);
      stringify({ status: "OK" }, res);
    });
    return;

  }

  res.statusCode = 404;
  res.end('Not found');

}).listen(4000, () =>
  console.log("redis-like running at 4000"));
