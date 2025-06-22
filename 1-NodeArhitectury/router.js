import * as habits from './controllers/users.controller.js';
 
export async function route(parsedData,date) {

  const {command, options} =  parsedData;
  console.log(parsedData);

 
   switch (command) {
    case 'add':
      await habits.addHabit(options.name,options.freq,date);
       break;
    case 'list':
      await habits.listHabits();
      break;

    case 'stats':
      await habits.showStats();
      break;

    case 'delete':
      await habits.deleteHabit(options.id);
      break;
    case 'update':
      await habits.updateHabit(options.id,options.name,options.freq);
      break;

    case 'done':
      await habits.markDone(options.id, date);
      break;


    default:
      console.log('Unknown command');
  }

}









