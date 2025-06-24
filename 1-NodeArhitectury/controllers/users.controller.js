
import { getToday } from '../helpers/getToday.js';
import {
  listInfo, getInfo, addInfo,
  patchInfo, deleteInfo
} from '../services/users.service.js';


export async function addHabit(value, options, date) {

  if (value && options && options === 'daily' || options === 'weekly' || options === 'monthly') {
    const body = {
      name: value, hits: [], creationDate: date, freq: options,
    };
    await addInfo(body);
    
    console.log('Звичка успішно додана !');

  } else {
    console.log('Frequency error: please use daily, weekly or monthly');
    return;
  }
}

export async function listHabits() {
  console.table(await listInfo());
}


export async function deleteHabit(id) {
  await deleteInfo(id);
  console.log('Звичку видалено !');
}

export async function updateHabit(id, name, freq) {

  await patchInfo(id, { name: name, freq: freq });


}

export async function markDone(id, date) {
  const habit = await getInfo(id);
  habit.hits.push(date);


  await patchInfo(id, { hits: habit.hits });


}



export async function showStats() {

  printStats(await listInfo());
}



function printStats(habits) {
  const today = new Date(getToday());
  console.log(today);
  const toDate = (s) => new Date(s);
  const list=[];



  function getPeriodStart(freq) {
    const d = new Date(today);
    if (freq === 'daily') d.setDate(d.getDate() - 6);
    if (freq === 'weekly') d.setDate(d.getDate() - 28);
    if (freq === 'monthly') d.setMonth(d.getMonth() - 6);
    return d;
  }


  function getExpectedCount(freq, created) {

    const delta = Math.floor((today - created) / (1000 * 60 * 60 * 24));
    if (freq === 'daily') return Math.min(7, delta + 1);
    if (freq === 'weekly') return Math.min(4, Math.floor(delta / 7) + 1);
    if (freq === 'monthly') return Math.min(6, Math.floor(delta / 30) + 1);
    return 0;

  }

 
  for (const h of habits) {
    const created = toDate(h.creationDate);
    const start = getPeriodStart(h.freq);
    const expected = getExpectedCount(h.freq, created);
    const hits = h.hits?.filter(date => toDate(date) >= start).length || 0;
    const percent = expected ? Math.round((hits / expected) * 100) : '—';

     list.push({name:h.name,freq:h.freq, expected:`${hits}/${expected}`, percentage:`${percent}` })
  }

  console.table(list);
}

 