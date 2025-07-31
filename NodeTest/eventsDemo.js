import {EventEmitter} from 'events';
const myEmitter = new EventEmitter();

const greetHandler=(name=>{
  console.log('Hello'+name);

})

const goodbyeHandler=(name)=>{
  console.log(`Goodbye World! ${name}`);
}

myEmitter.on('greet', greetHandler);
myEmitter.on('goodbye',goodbyeHandler);

myEmitter.emit('greet','John');

myEmitter.emit('goodbye','John');

myEmitter.on('error',(err)=>{
  console.log('An Error ', err)
})

myEmitter.emit('error', new Error('Something Wrong!'));

