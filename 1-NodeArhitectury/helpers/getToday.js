export function getToday(){
  const offset = Number(process.env.DAY_OFFSET)|| 0;
  const date = new Date();
  date.setDate(date.getDate()+offset);
  return date.toISOString().slice(0,10);
}