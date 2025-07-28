// import fs from 'fs';
import fs from 'fs/promises';


// fs.readFile('./text.txt', 'utf-8',(err, data)=>{
//   if (err) throw err;
//   console.log(data);
// })

// const data = fs.readFileSync('./text.txt', 'utf-8');

// console.log(data);
// fs.readFile('./text.txt', 'utf-8').then((data) => console.log(data)).catch((err) => console.log(err));
const  readFile= async ()=>{
try{ const data = await fs.readFile('./text.txt', 'utf-8');
  console.log(data);


}catch(err){

  console.log(err);
}
}

readFile();


const  writeFile= async ()=>{
try{ 
  await fs.writeFile('./text.txt', 'I`m writing to the file');
  console.log("File written to...");


}catch(err){

  console.log(err);
}
}

writeFile();

const  appendFile= async ()=>{
try{ 
  await fs.appendFile('./text.txt', '\nApended line');
  console.log("File appended...");


}catch(err){

  console.log(err);
}
}

appendFile();


