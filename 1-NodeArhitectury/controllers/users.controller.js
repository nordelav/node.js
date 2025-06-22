import {
  listUsers, getUser, addUser,
  patchUser, deleteUser
} from '../services/users.service.js';


export async function addHabit(value, options, date){

  if (options&&options === "daily"||options==="weekly"||options==="monthly")
  {
    const body = {
      name: value, hits: [], creationDate: date, freq: options,
    }
     await addUser(body);
     console.log("Звичка успішно додана !")
    
  }else{
    console.log("Frequency error: please use daily, weekly or monthly");
    return;
  }
}

 /* ---------- helpers ---------- */
function json(res, status, data = null) {
  res.writeHead(status, { 'Content-Type': 'application/json' });
  if (data) res.end(JSON.stringify(data));
  else res.end();
}

function bodyJSON(req) {
  return new Promise((resolve, reject) => {
    let raw = '';
    req.on('data', (c) => (raw += c));
    req.on('end', () => {
      try { resolve(JSON.parse(raw || '{}')); }
      catch { reject(new Error('Invalid JSON')); }
    });
  });
}