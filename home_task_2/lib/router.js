import { promises as fs, readdir } from 'node:fs';
import path, { join } from 'node:path';
import { pathToFileURL } from 'node:url';
import { resolve } from 'node:path';

const routes = new Map();
const METHODS = ["GET", "POST", "DELETE", "PATCH"];

export async function scan(dir = 'routes') {

  const list = (await fs.readdir(dir, { recursive: true, withFileTypes: true })).filter((item) => item.name === "route.js");

  for (const element of list) {
    const segments = element.path.split("/").filter(item => item !== dir).map((seg) => seg.startsWith("[") ? ":" + seg.slice(1, -1) : seg)

    const index = "/" + segments.join("/");
    const absPath = resolve(element.path, element.name);

    const spec = pathToFileURL(absPath).href + `?t=${Date.now()}`;

    if (!routes.has(index)) {
      routes.set(index, { segments, methods: {} });
      const mod = await import(spec);

      for (const m of METHODS) {
        if (mod[m] && typeof mod[m] === "function") {
          routes.get(index).methods[m] = mod[m];
        }
      }
    }
  };
  return routes;
}


export async function dispatch(req, res) {
  let path = req.url.split('?')[0]
  if (path.startsWith('/')) path = path.slice(1);
  if (path.endsWith('/')) path = path.slice(0, 1);

  console.log(path);

 const  segm = path ? path.split("/") : [];
  const method = req.method;


  for (const [_, info] of routes) {
    if (segm.length !== info.segments.length) continue;


    const params = {};
    let matched = true;

    for (let i = 0; i < segm.length; i++) {
      const t = info.segments[i];
      const u = segm[i];
      if (t.startsWith(':')) {

        params[t.slice(1)] = u;
      }
      else if (t !== u) {
        matched = false;
        break;
      }

    }
    if (!matched) continue;

    const handler = info.methods[method];

    if (!handler) {
      res.writeHead(405, { Allowed: Object.keys(info.methods).join(', ') });
      return res.end('Method Not Allowed!');
    }

    try {
      return await handler({ req, res, params });
    } catch (err) {
      res.writeHead(500);
      return res.end('Internal Error!')
    }

  }

  res.writeHead(404);
  res.end('Not Found');





}