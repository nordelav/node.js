import {promises as fs, readdir} from 'node:fs';
import{join} from 'node:path';
import { it } from 'node:test';

const routes = new Map();
const METHODS = ["GET","POST","DELETE", "PATCH"];

export async function scan(dir = 'routes', base='' ){

const list = (await fs.readdir(dir, { recursive:true, withFileTypes:true})).filter((item)=> item.name==="route.js");

console.log(list);
list.forEach(element => {
  console.log(element);
   const segments = element.path.split("/").filter(item=>item!==dir).map((seg)=>seg.startsWith("[")?":"+seg.slice(1,-1):seg)
   
   const index= "/"+segments.join("/");  

   if(!routes.has(index)){
    routes.set(index,{segments, methods:{}});



    // await 
    console.log(routes);
   }
});

  // for (const entry of await fs.readdir(dir, {withFileTypes:true})){
  //   console.log(entry);
  //   const path= join(dir,entry.name);
  //   console.log(path);

  //   if (entry.isDirectory()){
  //     await scan(path, join(base, entry.name));
  //     continue;
  //   }
  //    if (entry.name ==='route.js') continue;

    
  //    const tpl = "/"+ base.split("/").map((seg)=>seg.startsWith("[")?":"+seg.slice(1,-1):seg).join("/");
  //    console.log( tpl); 
    
  // }
}



 