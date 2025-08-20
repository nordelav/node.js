import 'dotenv/config';
//! - цей рядок постійно дає помилку 
import pkg from '../../package.json' with { type: 'json' }; 
// // Import version from package.json

import { z } from 'zod';

const DEFAULT_PORT = 8080;
const DEFAULT_ENV  = 'development';

const numberStringSchema = (def) => z.coerce.number().default(def).transform(String);

const schema = z.object({
  PORT:     numberStringSchema(DEFAULT_PORT),
  NODE_ENV: z.enum(['development', 'production', 'test']).default(DEFAULT_ENV)
});

const parsed = schema.parse(process.env);

export const config = {
  port: parsed.PORT,
  env:  parsed.NODE_ENV,
  baseUrl: `http://localhost:${parsed.PORT}`,
  appName: 'Coffee Brew Api',
  appVersion: '1.0.1',
};