import * as habits from './controllers/users.controller.js';
import { parseArgs } from "./helpers/parseArgs.js";

export async function route(args, date) {

  const {command, value, options} =  parseArgs(args);

  
  console
  if(!value) {
    console.log("Додайте значення, яке варто змінити !")
    return;
  }

  switch (command) {
    case 'add':
      await habits.addHabit(value,options,date);
       break;
    case 'list':
      await habits.listHabits();
      break;

    case 'stats':
      await habits.showStats();
      break;

    case 'delete':
      await habits.deleteHabit(value);
      break;
    case 'update':
      await habits.updateHabit(value);
      break;

    case 'done':
      await habits.markDone(value);
      break;


    default:
      console.log('Unknown command');
  }

}









