import { readFileSync } from 'node:fs';
import { join } from 'node:path';

export function loadEnv() {
  const envPath = join(process.cwd(), '.env');
  const lines = readFileSync(envPath, 'utf-8').split('\n');

  for (const line of lines) {
    if (!line || line.startsWith('#')) continue;
    const [key, ...rest] = line.split('=');
    const value = rest.join('=').trim();
    process.env[key.trim()] = value;
  }
}
