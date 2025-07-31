console.log(process.argv);
console.log(process.argv[2]);
console.log(process.env);

console.log(process.env.LOGNAME);

console.log(process.cwd());

console.log(process.title);

console.log(process.memoryUsage());

console.log(process.uptime());

process.on('exit',(code)=>{
  console.log(`About to exit with coe: ${code}`)
})

process.exit(0);
console.log('Hello from after');