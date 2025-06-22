// 

export function parseArgs(args) {
  const result = {
    command: null,
    value: null,
    options: null
  };

  let i = 0;

  while (i < args.length) {
    const current = args[i];

    if (current.startsWith('--')) {
      const key = current.replace(/^--/, '');

      const next = args[i + 1];
      if (!result.command) {
        
        result.command = key;
        result.value=next;
      } else {
        result.options = next;
      }

      i += 2;
    } else {
      i++;
    }
  }

  return result;
}
