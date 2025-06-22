

export function parseArgs(args) {
  const result = {
    command: null,
    options: {}
  };


 for(let i=0;i<args.length;i++){
  if (args.length && !args[0].startsWith('--')) {
    result.command = args[0];
  }

  if (args[i].startsWith('--')){
    const key = args[i].replace(/^--/, '');
      const value = args[i + 1];

      result.options[key] = value;
  }



 }
 
  return result;
}
